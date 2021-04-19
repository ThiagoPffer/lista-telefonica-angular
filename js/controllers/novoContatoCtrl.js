angular.module("listaTelefonica").controller("novoContatoCtrl", function($scope, contatosAPI, serialGenerator, $location, operadoras){
    $scope.operadoras = operadoras.data;

    $scope.adicionarContato = function(contato){
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato).then(function(data){
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            $location.path("/contatos")
        });
    }
});