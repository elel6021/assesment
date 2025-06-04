'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

userNameInput.addEventListener( // イベント検知の追加
  'keydown',// キー入力
  (event) => {
    if (event.key === 'Enter') {// 長rたきーがEnterなら
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)

assessmentButton.addEventListener(// イベント検知
  'click',//無名関数でアロー関数、イベント検知をしたら実行される
  () => {
    const userName = userNameInput.value;
    if (userName.length === 0){
      // 名前が空の時は処理を終了する
      return;
    }

    // 診断結果表示エリアの作成
    resultDivision.innerText = ''; // divタグを空文字で上書きすることで初期化している    const headerDivision = document.createElement('div'); // divタグを作成
    headerDivision.setAttribute('class','card-header text-bg-primary')// divタグにクラスを追加
    headerDivision.innerText = '診断結果';// divタグの中に診断結果と表示する

    const bodyDivision = document.createElement('div'); // divタグを作成
    bodyDivision.setAttribute('class','card-body')// divタグにクラスを追加

    const paragraph = document.createElement('p');// divタグの中にpタグを追加する
    paragraph.setAttribute('class', 'card-text'); // pタグにクラスを追加
    
    const result = assessment(userName);
    paragraph.innerText = result
    bodyDivision.appendChild(paragraph);// pタグをdivタグの子要素として追加

    resultDivision.setAttribute('class', 'card'); // divタグにクラスを追加
    resultDivision.appendChild(headerDivision); // divタグの子要素として追加
    resultDivision.appendChild(bodyDivision); // divタグの子要素として追加

    tweetDivision.innerText = ''; // ツイートエリアを空文字で上書きすることで初期化している
    const anchor = document.createElement('a');
    const hrefValue = 
    'https://twitter.com/intent/tweet?button_hashtag='
     + encodeURIComponent('あなたのいいところ') + 
     '&ref_src=twsrc%5Etfw'
    
    anchor.setAttribute('href', hrefValue); //属性hrefを追加
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result); //属性data-textを追加
    anchor.innerText = '#あなたのいいところを投稿する'//ボタンの文章を設定

    tweetDivision.appendChild(anchor);// divの子要素として追加

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);// divの子要素として追加
  }
);

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharcode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharcode += userName.charCodeAt(i);
  }
  // TODO ###userName###をユーザの名前に置き換える
  const index = sumOfCharcode % answers.length;
  let result = answers[index];
  result = result.replaceAll('###userName###', userName);
  return result;// 診断結果を返す
}

// 動作確認
function test(){
  console.log('太郎君の場合');
  console.assert(assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。','なんか違う')
  console.log('次郎君の場合');
  console.assert(assessment('次郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。','なんか違う')
  console.log('花子さんの場合');
  console.assert(assessment('花子') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。','なんか違う')
}
test();
