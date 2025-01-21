from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    image_url = models.URLField()
    count = models.IntegerField(default=0)
    width = models.FloatField()
    height = models.FloatField()
    weight = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Comment(models.Model):
    product = models.ForeignKey(Product, related_name='comments', on_delete=models.CASCADE)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment on {self.product.name}"
