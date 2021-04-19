angular.module("listaTelefonica").factory("contatosAPI", function($http, config) {
    var _getContatos = function() {
        return $http.get(config.baseUrl + "/contatos");
    };

    var _getContato = function(id) {
        return $http.get(config.baseUrl + "/contatos/" + id);
    };

    var _saveContato = function(contato) {
        return $http.post(config.baseUrl + "/contatos", contato);
    }

    var _deleteContato = function(contato) {
        return $http.delete(config.baseUrl + "/contatos/" + contato.id);
    }

    return {
        getContatos: _getContatos,
        getContato: _getContato,
        saveContato: _saveContato,
        deleteContato: _deleteContato
    };
});