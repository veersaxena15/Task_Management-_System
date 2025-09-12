# tasks/serializers.py

from rest_framework import serializers
from .models import Task, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class TaskSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'due_date', 'status', 'category', 'category_id']

    def create(self, validated_data):
        # Set owner to the current user
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)

    def get_queryset(self):
        # Ensure users can only affect their own categories
        return Category.objects.filter(owner=self.context['request'].user)