from django.contrib import admin
from .models import Hotel

@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ('name', 'stars', 'price_range', 'phone_number')
    list_filter = ('stars', 'price_range')
    search_fields = ('name', 'description')
    ordering = ('-stars', 'name')
