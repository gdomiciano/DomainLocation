describe("Location", function() {
    var $rootScope,
    $scope,
    controller;

    beforeEach(function() {
        module('geolocation');
        inject(function($injector){
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            controller = $injector.get('$controller')('Location', {'$scope':$scope});
        })
    });

    it('initialization', function(){
        expect($scope.locations[0].query).toEqual("0.0.0.0");
    });

    describe('Http requests',function(){
        beforeEach(function() {
            jasmine.Ajax.install();
        });
        afterEach(function() {
            jasmine.Ajax.uninstall();
        });

        it("success to get user's location", function() {

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(args) {
                if (this.readyState == this.DONE) {
                }
            };

            xhr.open("GET", "http://ip-api.com/json/");
            xhr.send();

            expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://ip-api.com/json/');

            jasmine.Ajax.requests.mostRecent().respondWith({
                "status": 200,
                "contentType": 'application/json',
                "status": 'success'
            });
        });
        it("success responde when web Site start with 'www.'", function() {

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(args) {
                if (this.readyState == this.DONE) {
                }
            };

            xhr.open("GET", "http://ip-api.com/json/www.submarino.com.br");
            xhr.send();

            expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://ip-api.com/json/www.submarino.com.br');
            jasmine.Ajax.requests.mostRecent().respondWith({
                "status": 200,
                "contentType": 'application/json',
                "status": 'success'
            });
        });
        it("success responde when web Site not start with 'www.'", function() {

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(args) {
                if (this.readyState == this.DONE) {
                }
            };

            xhr.open("GET", "http://ip-api.com/json/google.com");
            xhr.send();

            expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://ip-api.com/json/google.com');
            jasmine.Ajax.requests.mostRecent().respondWith({
                "status": 200,
                "contentType": 'application/json',
                "status": 'success'
            });
        });
        it("Fail when try to get a invalid web Site", function() {

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(args) {
                if (this.readyState == this.DONE) {
                }
            };

            xhr.open("GET", "http://ip-api.com/json/sadfghjkl.com");
            xhr.send();

            expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://ip-api.com/json/sadfghjkl.com');
            jasmine.Ajax.requests.mostRecent().respondWith({
                "status": 200,
                "contentType": 'application/json',
                "status": 'fail',
                "message": "invalid query"
            });
        });
    });

});