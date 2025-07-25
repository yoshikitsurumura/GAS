function doPost(e) {
  let response;
  try {
    // POSTされてきたJSONデータをパースする
    const params = JSON.parse(e.postData.contents);

    // パラメータを取得
    const title = params.title;
    const content = params.content;

    // パラメータがなければエラー
    if (!title || !content) {
      throw new Error("パラメータ 'title' と 'content' は必須です。");
    }

    // 新しいドキュメントを作成してテキストを追加
    const doc = DocumentApp.create(title);
    // ★★★ ここが修正された正しい行です ★★★
    doc.getBody().editAsText().appendText(content);
    doc.saveAndClose();

    // 成功レスポンスを作成
    response = {
      success: true,
      url: doc.getUrl(),
      message: "新しいGoogleドキュメントが作成されました。"
    };

  } catch (err) {
    // エラーレスポンスを作成
    response = {
      success: false,
      error: err.message
    };
  }

  // JSON形式でレスポンスを返す
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}