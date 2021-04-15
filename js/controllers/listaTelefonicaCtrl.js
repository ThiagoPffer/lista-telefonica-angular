angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, contatosAPI, operadorasAPI, serialGenerator){
    $scope.app = "Lista Telefonica";
    $scope.contatos = [
        // {nome: "Pedro", telefone: "9999-8888", date: new Date(), operadora: {nome: "Oi", codigo: 14, categoria: "Celular"}, color: "red"},
        // {nome: "Ana", telefone: "9523-4458", date: new Date(), operadora: {nome: "Vivo", codigo: 15, categoria: "Celular"}, color: "red"},
        // {nome: "Maria", telefone: "4524-4455", date: new Date(), operadora: {nome: "Tim", codigo: 41, categoria: "Celular"}, color: "red"}
    ];
    $scope.operadoras = [
        // {nome: "Oi", codigo: 14, categoria: "Celular", preco: 1},
        // {nome: "Vivo", codigo: 15, categoria: "Celular", preco: 2},
        // {nome: "Tim", codigo: 41, categoria: "Celular", preco: 3},
        // {nome: "GVT", codigo: 25, categoria: "Fixo", preco: 4},
        // {nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 5}
    ];
    var carregarContatos = function(){
        contatosAPI.getContatos().then(function(data) {
            $scope.contatos = data.data;
        }).catch(function(data){
            $scope.message = "Algo de errado não está certo: " + data;
        });
    };
    var carregarOperadoras = function() {
        operadorasAPI.getOperadoras().then(function(data) {
            $scope.operadoras = data.data;
        });
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
                console.log(contato.id);
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

    carregarContatos();
    carregarOperadoras();
});