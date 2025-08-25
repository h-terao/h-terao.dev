---
title: "AzureのPostgreSQL Flexible Serverでpgvectorを使用するとエラーになることがある"
published: 2025-08-24
tags: [Azure, PostgreSQL]
---

先日、タイトル通りのバグを踏み抜いた。<br/>
手元では問題なく動作していたので原因の特定に時間がかかったが、Azure のフォーラムで同様の問題が報告されているのを見つけた。

- [Azure Database for PostgreSQL flexible server crashes with vector 0.8.0](https://learn.microsoft.com/en-us/answers/questions/2284930/azure-database-for-postgresql-flexible-server-cras)
- [pgvector 0.8.0 + hnsw on azure postgresql flexible server stopped working](https://learn.microsoft.com/en-us/answers/questions/5530146/pgvector-0-8-0-hnsw-on-azure-postgresql-flexible-s)

PostgreSQL Flexible Serverの背後で動いている CPU の型番が古く、pgvector が依存している命令セットをサポートしていないことが原因らしい。<br/>
すまん、使えないのなら使えないとドキュメントに書いてくれ🖐️

新しめの CPU を使わせてくれそうな、お高いプランに変更すると正常に動作するようになった。めでたしめでたし（本当？）
