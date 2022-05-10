/*
  Заранее определены 2 функции: fetchData и getHashByData, которые понадобятся
  вам для решения и находятся в глобальной области видимости.

  type FetchResult = {
    data: string,
    hashSum: string,
  }

  function fetchData(url: string): Promise<FetchResult>;

  @param hash - результат вычисления хеш-суммы от переданных данных
  type CallbackFunction = (hash: string) => void;

  @param data - данные от которых следует вычислить хеш.
  @param callbackFn - функция, в которую следует передать вычисленный хеш.
  function getHashByData(data: string, callbackFn: CallbackFunction): void;
*/

/* 
  Полученные данные должны возвращаться в виде массива.
  Если в итоге информацию получить не удалось, хотя бы из одного API, выдавать
  ошибку с текстом: "Не удалось получить данные".

  Описание возвращаемых функцией fetchData данных. Хеш всегда корректен.
  
  fetchData('metrika.ru/api/analitics') -> Promise<{data: 'Metrika data', hashSum: '#correctHash'}>
  fetchData('google.ru/api/analitics') -> Promise<{data: 'Google analytics data', hashSum: '#correctHash'}>
  
  fetchData('badhost-analitics.com/api/analitics') -> Сервер постоянно не доступен

  solution - ваше решение.

   Позитивный
  solution(['metrika.ru/api/analitics', 'google.ru/api/analitics'], 3)
  .then(data => console.log(data)) // ['Metrika data', 'Google analytics data']
  .catch(error => console.log(error.message))

   Негативный
  solution(['metrika.ru/api/analitics', 'badhost-analitics.com/api/analitics'], 3)
  .then(data => console.log(data))
  .catch(error => console.log(error.message)) // "Не удалось получить данные" */

module.exports = async function (urls, retryCount) {
  const dataArray = await Promise.all(
    urls.map(url => fetchDataAndCompareHash(url, retryCount)),
  );

  if (dataArray.some(data => data === undefined)) {
    throw new Error('Не удалось получить данные');
  }

  return dataArray;
};

async function fetchDataAndCompareHash(url, retryCount) {
  let retried = 0;

  while (retried <= retryCount) {
    try {
      const { data, hashSum } = await fetchData(url);
      const ourHashSum = await getHashByDataPromise(data);
      if (ourHashSum !== hashSum) throw new Error();
      return data;
    } catch (err) {
      retried++;
    }
  }

  return undefined;
}

function getHashByDataPromise(data) {
  return new Promise(resolve => getHashByData(data, resolve));
}
