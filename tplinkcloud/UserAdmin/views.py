from django.shortcuts import render, redirect, get_object_or_404
from .models import User
from .forms import UserAddForm, UserUpdateForm, LoginForm, SignUpForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
# from django.contrib.auth.hashers import make_password

import shlex
import subprocess

# Create your views here.

# @login_required
def index(request):
    return render(request, 'UserAdmin/index.html')

def login_view(request):
    form = LoginForm(request.POST)
    error = ''
    if form.is_valid():
        useremail   = form.cleaned_data.get('email')
        pwd         = form.cleaned_data.get('password')

        print(useremail)
        print(pwd)

        user = authenticate(request=request, email=useremail, password=pwd)
        print(user)
        if user is not None:
            login_api(email, password,)
            #login(request, user)
            #redirect_url = request.GET.get('next', 'dashboard')
            return redirect(redirect_url)
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
        login(request, user, backend='django.contrib.auth.backends.ModelBackend')

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
    api_login = ''' curl -X POST -H 'Content-Type: application/jsonrequest' -d '{  "method": "login",  "params": {  "appType": "Kasa_Iphone",  "cloudUserName": "user@domain.com",  "cloudPassword": "v6g-jyg-yjg",  "terminalUUID": "0e833d73-5943-4593-8d620364f1825028" } }' -v -i 'https://wap.tplinkcloud.com' '''
    args = shlex.split(api_login)
    print (args)
    status, output = subprocess.getstatusoutput(args)
    print ('status :\n', status)
    print ('*******************')
    print ('output :\n', output)