"""proxyAdmin URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views

app_name = 'UserAdmin'

urlpatterns = [
    path('dashboard/<int:pk>', views.index, name="dashboard"),
    path('login/', views.login_view, name="login"),
    path('', views.index, name="dashboard"),
    path('list/', views.list_user, name="list_user"),
    path('add/', views.add_user, name="add_user"),
    path('detail/<int:pk>/setpassword', views.set_password, name="setpassword"),
    path('detail/<int:pk>', views.detail_user, name="detail_user"),
    path('delete/<int:pk>', views.delete_user, name="delete_user")
    
]
