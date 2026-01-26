from django.contrib import admin
from .models import Attraction, DigitalArtifact

@admin.register(Attraction)
class AttractionAdmin(admin.ModelAdmin):
    list_display = ('name', 'attraction_type', 'visit_duration_minutes', 'ticket_price', 'opening_time', 'closing_time')
    list_filter = ('attraction_type',)
    search_fields = ('name', 'description')
    ordering = ('name',)

@admin.register(DigitalArtifact)
class DigitalArtifactAdmin(admin.ModelAdmin):
    list_display = ('name', 'related_attraction')
    search_fields = ('name', 'description')
