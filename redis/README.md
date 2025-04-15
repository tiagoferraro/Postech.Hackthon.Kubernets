# Redis Deployment

Este diretório contém os arquivos necessários para implantar um servidor Redis no Kubernetes com acesso externo.

## Configuração

O deployment está configurado com:
- Redis rodando na porta 6379
- 1 réplica
- Limites de recursos definidos
- Serviço LoadBalancer para acesso externo

## Como usar

1. Aplique o deployment:
```bash
kubectl apply -f redis-deployment.yaml
```

2. Verifique se o pod está rodando:
```bash
kubectl get pods -l app=redis
```

3. Obtenha o endereço IP externo do serviço:
```bash
kubectl get svc redis
```

4. Para acessar o Redis externamente:
```bash
redis-cli -h <IP_EXTERNO> -p 6379
```

5. Para remover o deployment:
```bash
kubectl delete -f redis-deployment.yaml
```

## Observações
- O serviço está configurado como LoadBalancer para permitir acesso externo
- O endereço IP externo será atribuído pelo provedor de nuvem ou pelo MetalLB se estiver usando um cluster local
- Certifique-se de que seu cluster Kubernetes suporta serviços do tipo LoadBalancer 