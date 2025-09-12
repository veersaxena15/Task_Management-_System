# tasks/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = [
    path('api/', include(router.urls)),
]