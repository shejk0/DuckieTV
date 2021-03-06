/**
 * Vuze has *exactly* the same API as Transmission, so we'll just use that whole implementation and change the config
 * it reads from.
 */
DuckieTorrent.factory('Vuze', ["BaseTorrentClient", "TransmissionRemote", "TransmissionAPI",
    function(BaseTorrentClient, TransmissionRemote, TransmissionAPI) {

        var Vuze = function() {
            BaseTorrentClient.call(this);
        };
        Vuze.extends(BaseTorrentClient, {});

        var service = new Vuze();
        service.setName('Vuze');
        service.setAPI(new TransmissionAPI());
        service.setRemote(new TransmissionRemote());
        service.setConfigMappings({
            server: 'vuze.server',
            port: 'vuze.port',
            key: 'vuze.key',
            username: 'vuze.username',
            password: 'vuze.password',
            use_auth: 'vuze.use_auth'
        });
        service.setEndpoints({
            rpc: 'this is replaced by config.key'
        });
        service.readConfig();

        return service;
    }
])

.run(["DuckieTorrent", "Vuze", "SettingsService",
    function(DuckieTorrent, Vuze, SettingsService) {
        if (SettingsService.get('torrenting.enabled')) {
            DuckieTorrent.register('Vuze', Vuze);
        }
    }
]);