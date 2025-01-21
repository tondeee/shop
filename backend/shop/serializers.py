from rest_framework import serializers
from .models import Product, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'product', 'description', 'date']

class SizeSerializer(serializers.Serializer):
    width = serializers.FloatField()
    height = serializers.FloatField()

class ProductSerializer(serializers.ModelSerializer):
    comments = serializers.ListField(child=serializers.CharField(), write_only=True, required=False, allow_empty=True)
    size = SizeSerializer(write_only=True)
    imageUrl = serializers.URLField(source='image_url')

    class Meta:
        model = Product
        fields = ['id', 'imageUrl', 'name', 'count', 'size', 'weight', 'comments']

    def create(self, validated_data):
        comments_data = validated_data.pop('comments', None)
        size_data = validated_data.pop('size', {})
        validated_data['width'] = size_data.get('width', 0)
        validated_data['height'] = size_data.get('height', 0)
        
        product = super().create(validated_data)
        
        # Create comments only if they were provided
        if comments_data is not None:
            for comment_text in comments_data:
                Comment.objects.create(product=product, description=comment_text)
        
        return product

    def update(self, instance, validated_data):
        comments_data = validated_data.pop('comments', None)
        size_data = validated_data.pop('size', {})
        validated_data['width'] = size_data.get('width', 0)
        validated_data['height'] = size_data.get('height', 0)
        
        instance = super().update(instance, validated_data)
        
        # Update comments only if they were provided in the request
        if comments_data is not None:
            instance.comments.all().delete()
            for comment_text in comments_data:
                Comment.objects.create(product=instance, description=comment_text)
        
        return instance

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['size'] = {'width': instance.width, 'height': instance.height}
        ret['comments'] = CommentSerializer(instance.comments.all(), many=True).data
        return ret
