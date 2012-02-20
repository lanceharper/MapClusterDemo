var o = {
    init: function () {
        this.map.init();
    },
    routes: {
        upcomingEvents: '',
        eventsForClusterRoute: ''
    },
    mapping: {
        map: null,
        markerClusterer: null,
        markers: [],
        timer: null
    },
    displayEventInfo: function (eventIds) {

        $("body").css("cursor", "progress");

        $.ajax({
            url: o.routes.eventsForClusterRoute,
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({
                eventIds: eventIds
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (events) {
                $("#event-list").hide();
                $(".event-detail").remove();
                $.each(events, function (key, value) {

                    var eventTmpl = {
                        EventId: value.EventId,
                        Latitude: value.Latitude,
                        Longitude: value.Longitude
                    };

                    $("#event-template").tmpl(eventTmpl).appendTo("#event-list");

                });

                $("#event-list").fadeIn(500).parent().css({ 'overflow-y': 'scroll', 'height': '485px' });
                $("body").css("cursor", "auto");
            }
        });
    },
    map: {
        size: function () {
            var w = $("#map-container").width(),
                        h = $("#map-container").height();
            return { width: w, height: h };
        },
        data: {
            zoom: 4,
            center: new google.maps.LatLng(39.1574230, -94.8327590),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        init: function () {
            var size = o.map.size();

            $('#map').css({ width: size.width, height: size.height });
            o.mapping.map = new google.maps.Map(document.getElementById('map'), o.map.data);

            o.map.loadEvents();
        },
        loadEvents: function () {

            $.ajax({
                url: o.routes.upcomingEvents,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({

                }),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {

                   
                    if (o.mapping.markerClusterer) {
                        o.mapping.markerClusterer.clearMarkers();
                    }


                    if (o.mapping.markers) {
                        for (var j in o.mapping.markers) {
                            o.mapping.markers[j].setMap(null);
                        }
                        o.mapping.markers.length = 0;
                    }

                    var recentActivity = result.events;
                    $.each(recentActivity, function (i, ev) {

                        var marker = new google.maps.Marker({
                            map: o.mapping.map,
                            position: new google.maps.LatLng(ev.Latitude, ev.Longitude),
                            locationId: ev.LocationId,
                            eventId: ev.EventId
                        });

                        google.maps.event.addListener(marker, 'mouseover', function () {
                            var myMarker = this;
                            var eventIds = [];
                            eventIds.push(myMarker.eventId);

                            o.displayEventInfo(eventIds);
                        });

                        o.mapping.markers.push(marker);
                    });
                    o.mapping.markerClusterer = new MarkerClusterer(o.mapping.map, o.mapping.markers);
                }
            });
        },
        navigateToEvent: function (position) {

            o.mapping.map.setZoom(15);
            o.mapping.map.setCenter(position);
        }
    }
};