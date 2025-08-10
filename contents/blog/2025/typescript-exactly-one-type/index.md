---
title: "Exclusive 型を作る"
description: "TypeScript で排他的なプロパティを持つオブジェクトを表現するための Exclusive 型の実装と活用例"
published: 2025-08-10
tags: [TypeScript]
coverImage: "./cover.jpg"
---
この記事では、TypeScript で排他的なプロパティを持つオブジェクトを表現するための `Exclusive` 型について、その実装例と活用例を紹介します。

## Exclusive の動作例

`Exclusive` 型の目的は、オブジェクトが複数のプロパティ候補の中からちょうど 1 つのプロパティだけを持つことを強制することです。
例えば、`Exclusive` 型を使って以下のような型が定義されているとします。

```ts
Exclusive<{ id: string; name: string }>
```

この場合、次のオブジェクトは型チェックを通ります。

```ts
{ id: "1" }
{ name: "Alice" }
```

一方、次のオブジェクトは型チェックでエラーになります。

```ts
{ id: "1", name: "Alice" } // 両方ある
{} // どちらのプロパティもない
```

## 実装

先に答えを言うと、`Exclusive` 型は次のように実装できます。

```ts
type Exclusive<T extends object> = {
  [K in keyof T]: { [P in K]: T[P] } & { [P in Exclude<keyof T, K>]?: never };
}[keyof T];
```

この型定義は、次の 3 つのステップで構成されています。

1. 各プロパティを持つ型を生成
  - 該当部分：`{ [K in keyof T]: { [P in K]: T[P] }`
  - `T` の各プロパティ `K` に対して、そのプロパティだけを持つ型を生成する
2. 他のプロパティを禁止
  - 該当部分：`{ [P in Exclude<keyof T, K>]?: never }`
  - `Exclude<keyof T, K>` に `never` を割り当てることで、`K` 以外のプロパティを型レベルで禁止する
3. ユニオン型に変換
  - 該当部分：`{...}[keyof T]`
  - 上記 1 と 2 を組み合わせた型の「辞書」から、すべての値型をユニオンとして取り出す

例えば、`T = {id: string; name: string}` の場合、以下のようにして型が生成されます。

```ts
// 1. 各プロパティを持つ型を生成
{ id: { id: string }, name: { name: string }}

// 2. 他のプロパティを禁止
{ id: { id: string; name: never }, name: { name: string; id: never }}

// 3. ユニオン型に変換
{ id: string; name: never } | { name: string; id: never }
```

## 活用例

私は、`Exclusive` 型を以下のようなエラー型を実装する際に使用しています。

```ts
class UserNotFoundError extends Error {
  constructor(user: Exclusive<{ id: string; name: string }>) {
    const identifier = user.id ? "id" : "name";
    const value = user[identifier];
    super(`User with ${identifier} "${value}" not found`);
  }
}
```

この `UserNotFoundError` は、ユーザが存在しない場合に使用されます。
検索条件として `id` または `name` のどちらか 1 つを受け取り、型レベルでその制約を保証できます。
これにより、同じエラー型を使いながら、適切なエラーメッセージを型レベルで安全に生成できるようになります。

## まとめ

この記事では、`Exclusive` 型の実装例を紹介しました。この型を使用することで、型レベルでの制約を強化し、より安全なコードを書くことができます。使い所は限られるかもしれませんが、特定のユースケースではかなり便利だと思います。

## 参考

- [TypeScriptの排他的な型について](https://qiita.com/Shuhei-pp/items/339a5ba746b9cda0e791)
- [TypeScriptで排他的なプロパティを定義する](https://miyauchi.dev/ja/posts/exclusive-property/)