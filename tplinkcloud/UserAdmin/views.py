from django.shortcuts import render, redirect, get_object_or_404
from .models import User, DeviceList, DeviceUsage
from .forms import UserAddForm, UserUpdateForm, LoginForm, SignUpForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import json
# from django.contrib.auth.hashers import make_password

import shlex
import subprocess

# Create your views here.

# @login_required
def index(request):
    userId = request.user.id
    deviceList = DeviceList.objects.filter(user_id=userId, status=1)
    deviceCount = len(deviceList)

    dashboard_info = {
        # 'csrf'        : csrf(request),
        'userId'      : request.user.id,
        'email'       : request.user.email,
        'deviceCount' : deviceCount
    }
    return render(request, 'UserAdmin/index.html', dashboard_info)

def login_view(request):
    form = LoginForm(request.POST)
    error = ''
    if form.is_valid():        
        useremail   = form.cleaned_data.get('email')
        pwd         = form.cleaned_data.get('password')
        
        # user = authenticate( username=username, email=useremail, password=pwd)
        user = User.objects.get(email=useremail.lower())
        user.backend = 'django.contrib.auth.backends.ModelBackend'        

        if user is not None:
            uuid = user.uuid            
            response = login_api(useremail, pwd, uuid)
            if (response['status'] == 0):
                userId = user.id
                device_info = get_device_info(response['output'])
                token = device_info['token']
                is_success = get_device_list(userId, token)
                login(request, user)
                
                redirect_url = request.GET.get('next', 'UserAdmin:dashboard')
                return redirect(redirect_url)

            error = 'Connection API Failed'
            
        error = 'Invalid Credential'
    print(error)
    return render(request, 'login.html', {'form': form, 'error': error})


def signup_view(request):
    #if request.method == 'POST':
    form = SignUpForm(request.POST)
    error = ''    
    if form.is_valid():
        form.save()
        username    = form.cleaned_data.get('signup-username')
        useremail   = form.cleaned_data.get('signup-email')
        pwd         = form.cleaned_data.get('signup-password')
        pwd1        = form.cleaned_data.get('signup-password-confirm')

        user        = authenticate(email=useremail, password=pwd)                
        # login(request, user)
        redirect_url = request.GET.get('next', 'UserAdmin:login')
        return redirect(redirect_url)

    print(error)
    return render(request, 'signup.html', {'form': form, 'error': error})

@login_required
def logout_view(request):
    logout(request)
    return redirect('/login')

@login_required
def list_user(request):
    users = User.objects.exclude(is_superuser=True)
    return render(request, 'UserAdmin/list_user.html', {'users': users})

@login_required
def add_user(request):
    if request.method == 'POST':
        form = UserAddForm(request.POST)
        if form.is_valid():
            form.save()
            messages.add_message(request, messages.SUCCESS, 'User Added Successfully')
            return redirect('UserAdmin:list_user')
        print(form.errors)
        return render(request, 'UserAdmin/add_user.html', {'form': form})
    if request.method == 'GET':
        form = UserAddForm()
        print(form.errors)
        return render(request, 'UserAdmin/add_user.html', {'form': form})

@login_required
def detail_user(request, pk):
    user = get_object_or_404(User.objects.exclude(is_superuser=True), pk=pk)
    form = UserUpdateForm(instance=user)
    if request.method == 'POST':
        form = UserUpdateForm(request.POST, instance=user)
        print("==========")
        print(form)
        if form.is_valid():
            form.save()
            messages.add_message(request, messages.SUCCESS, 'User updated Successfully')
            return redirect('UserAdmin:list_user')
    print(form)
    return render(request, 'UserAdmin/detail_user.html', {'form': form})

@login_required
def delete_user(request, pk):
    if request.method == 'POST':
        user = get_object_or_404(User.objects.exclude(is_superuser=True), pk=pk)
        user.delete()
        messages.add_message(request, messages.SUCCESS, 'User Deleted Successfully')
        return redirect('UserAdmin:list_user')

@login_required
def set_password(request, pk):
    if(request.method == 'POST'):
        password = request.POST['password']
        user = get_object_or_404(User.objects.exclude(is_superuser=True), pk=pk)
        user.password = password
        user.save()
        messages.add_message(request, messages.SUCCESS, 'Change Password Successfully')
        return redirect('UserAdmin:detail_user', pk=pk)

def login_api(email, pwd, uuid):
    api_login = ''' curl -X POST -H 'Content-Type: application/jsonrequest' -d '{  "method": "login",  "params": {  "appType": "Kasa_Iphone",  "cloudUserName": "''' + email + '''",  "cloudPassword": "''' + pwd + '''",  "terminalUUID": "''' + str(uuid) + '''" } }' -v -i 'https://wap.tplinkcloud.com' '''        
    args = shlex.split(api_login)
    status, output = subprocess.getstatusoutput(args)

    response = {
        "status" : status,
        "output" : output
    }
    
    return response

def get_device_info(output):
    lines = output.split('\n')
    resultstr = lines[-1]

    json_result = json.loads(resultstr)

    info = {
        'accountId' : json_result["result"]['accountId'],
        'regTime'   : json_result["result"]['regTime'],
        'token'     : json_result["result"]['token']
    }

    return info

def get_device_list(userId, token):
    api_getdevicelist       = '''curl -s --request POST "https://wap.tplinkcloud.com?token=''' + token + ''' HTTP/1.1"  --data '{"method":"getDeviceList"}'  --header "Content-Type: application/json" '''
    args = shlex.split(api_getdevicelist)
    status, output = subprocess.getstatusoutput(args)
    json_data = json.loads(output)
    
    response = json_data['error_code']
    json_result = json_data['result']

    is_success= True

    if (response == 0) :
        user_device_list = {}
        for item in range(len(json_data['result']['deviceList'])):
            device = json_data['result']['deviceList'][item]

            user_device_list['deviceType'] = device['deviceType']
            user_device_list['role'] = device['role']
            user_device_list['fwVer'] = device['fwVer']
            user_device_list['appServerUrl'] = device['appServerUrl']
            user_device_list['deviceRegion'] = device['deviceRegion']
            user_device_list['deviceId'] = device['deviceId']
            user_device_list['deviceName'] = device['deviceName']
            user_device_list['deviceHwVer'] = device['deviceHwVer']
            user_device_list['alias'] = device['alias']
            user_device_list['deviceMac'] = device['deviceMac']
            user_device_list['deviceModel'] = device['deviceModel']
            user_device_list['hwId'] = device['hwId']
            user_device_list['fwId'] = device['fwId']
            user_device_list['isSameRegion'] = device['isSameRegion']
            user_device_list['status'] = device['status']

            store_user_device_info(userId, token, user_device_list)

    return is_success;


def store_user_device_info(userId, token, deviceInfo):    
    deviceform = DeviceList(user_id=userId, 
                        deviceType=deviceInfo['deviceType'], 
                        role=deviceInfo['role'],
                        fwVer=deviceInfo['fwVer'], 
                        appServerUrl=deviceInfo['appServerUrl'],
                        deviceRegion=deviceInfo['deviceRegion'], 
                        deviceId=deviceInfo['deviceId'],
                        deviceName=deviceInfo['deviceName'], 
                        deviceHwVer=deviceInfo['deviceHwVer'],
                        alias=deviceInfo['alias'], 
                        deviceMac=deviceInfo['deviceMac'],
                        deviceModel=deviceInfo['deviceModel'], 
                        hwId=deviceInfo['hwId'],
                        fwId=deviceInfo['fwId'], 
                        isSameRegion=deviceInfo['isSameRegion'],
                        status=deviceInfo['status'])

    userDevice = DeviceList.objects.filter(user_id=userId, deviceId=deviceInfo['deviceId']).first()

    if userDevice is None:
        deviceform.save()

    api_requestdata  = '''curl --request POST "https://eu-wap.tplinkcloud.com/?token=''' + token + ''' HTTP/1.1" --data '{ "method":"passthrough", "params": {"deviceId": "''' + deviceInfo['deviceId'] + '''", "requestData": "emeter" } }' --header "Content-Type: application/json"'''
    
    args = shlex.split(api_requestdata)
    status, output = subprocess.getstatusoutput(args)

    device_info = {}
    
    lines = output.split('\n')
    resultstr = lines[-1]

    json_data = json.loads(resultstr)

    response = json_data['error_code']

    if (response == 0):        
        json_result = json_data['result']
        
        responseData = json.loads(json_data['result']['responseData'])

        device_info['error_code']   = response
        device_info['current']      = responseData['emeter']['get_realtime']['current']
        device_info['voltage']      = responseData['emeter']['get_realtime']["voltage"]
        device_info['power']        = responseData['emeter']['get_realtime']["power"]
        device_info['total']        = responseData['emeter']['get_realtime']["total"]

        deviceUsageForm = DeviceUsage(user_id=userId, 
                        device_id=deviceInfo['deviceId'], 
                        current=device_info['current'],
                        voltage=device_info['voltage'], 
                        power=device_info['power'],
                        total=device_info['total'])

        # deviceUsageForm.save()

    else:
        device_info['error_code'] = response
        device_info['msg']        = json_data['msg']

    return device_info