DuckieTV.controller("rTorrentCtrl", ["$injector", "rTorrent", "SettingsService", "FormlyLoader",
    function($injector, rTorrent, SettingsService, FormlyLoader) {

        var self = this;

        FormlyLoader.load('TorrentClientSettings').then(function(fields) {

            self.model = {
                server: SettingsService.get('rtorrent.server'),
                port: SettingsService.get('rtorrent.port'),
                use_auth: SettingsService.get('rtorrent.use_auth'),
                username: SettingsService.get('rtorrent.username'),
                password: SettingsService.get('rtorrent.password'),
                path: SettingsService.get('rtorrent.path'),
                use_path: true,
                hideUsername: true,
                hideKey: true,
                hideUseAuth: true
            };

            self.fields = fields;
        });

        this.isConnected = function() {
            return rTorrent.isConnected();
        };

        this.test = function() {
            //console.log("Testing settings");
            rTorrent.Disconnect();
            rTorrent.setConfig(this.model);
            rTorrent.connect().then(function(connected) {
                debugger;
                console.info("rTorrent connected! (save settings)", connected);
                rTorrent.saveConfig();
                $injector.get('DuckietvReload').windowLocationReload();
            }, function(error) {
                console.error("rTorrent connect error!", error);
            });
        };
    }
]);