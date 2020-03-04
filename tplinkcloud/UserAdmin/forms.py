from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django import forms
from .models import User

class UserAddForm(ModelForm):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'password')


class UserUpdateForm(ModelForm):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name')

class LoginForm(ModelForm):
    email = forms.EmailField()
    password = forms.CharField()

    class Meta:
        model = User
        fields = ('email', 'password')

class SignUpForm(ModelForm):
    username        = forms.CharField(max_length=30)
    email           = forms.EmailField(max_length=100)
    password        = forms.PasswordInput()
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', )

    def create_user(self, user, email, password):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user