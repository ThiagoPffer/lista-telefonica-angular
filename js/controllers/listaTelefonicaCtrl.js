angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatos, contatosAPI, operadoras, serialGenerator){
    $scope.app = "Lista Telefonica";
    $scope.contatos = contatos.data;
    $scope.operadoras = operadoras.data;
    $scope.contato = {
        data: new Date()
    };

    $scope.adicionarContato = function(contato){
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        contatosAPI.saveContato(contato).then(function(data){
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    }

    $scope.apagarContatos = function(contatos){
        contatos.filter(function(contato) {
            if(contato.selected){
                contatosAPI.deleteContato(contato).then(function(response){
                    console.log(response.data);
                });
            };
        });
    }

    $scope.isContatoSelected = function(contatos){
        return contatos.some(function(contato){
            return contato.selected;
        });
    }

    $scope.ordernarPor = function(campo){
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }
});