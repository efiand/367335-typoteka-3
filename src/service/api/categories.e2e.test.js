'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {StatusCodes} = require(`http-status-codes`);

const categories = require(`./categories`);
const CategoriesService = require(`../data-services/categories`);
const mockData = [
  {
    id: `IAmPne`,
    title: `Лучше рок-музыканты 20-века`,
    announce: `Смеркалось. Дуракам закон не писан. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Первая большая ёлка была установлена только в 1938 году.`,
    fullText: `Смеркалось.`,
    createdDate: `2020-09-10 12:17:31`,
    category: `Железо\nДети\nЗа жизнь\nДеньги\nРоссия\nФронтенд\nКоты\nОтношения\nМузыка`,
    comments: [
      {
        id: `3yU-bU`,
        text: `Хочу такую же футболку :-) Мне кажется или я уже читал это где-то? Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором!"`
      },
      {
        id: `r9vFNe`,
        text: `Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Плюсую, но слишком много буквы! Планируете записать видосик на эту тему? Согласен с автором! Мне кажется или я уже читал это где-то?"`
      },
      {
        id: `JQ6mSb`,
        text: `Совсем немного... Хочу такую же футболку :-) Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?"`
      },
      {
        id: `mRbfV5`,
        text: `Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-) Согласен с автором! Планируете записать видосик на эту тему? Совсем немного..."`
      },
      {
        id: `7NU_33`,
        text: `Хочу такую же футболку :-) Совсем немного... Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы! Планируете записать видосик на эту тему?"`
      },
      {
        id: `G6NsT2`,
        text: `Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему? Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты? Совсем немного... Плюсую, но слишком много буквы!"`
      },
      {
        id: `88at2U`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Совсем немного... Планируете записать видосик на эту тему? Хочу такую же футболку :-) Согласен с автором! Это где ж такие красоты? Плюсую, но слишком много буквы!"`
      }
    ]
  },
  {
    id: `75ON8I`,
    title: `Как собрать камни бесконечности`,
    announce: `Как начать действовать? Для начала просто соберитесь. Ещё никогда Штирлиц не был так близок к провалу. Первая большая ёлка была установлена только в 1938 году. Не было бы счастья, да несчастье помогло.`,
    fullText: `Не было бы счастья, да несчастье помогло. Дуракам закон не писан. Программировать не настолько сложно, как об этом говорят. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Первая большая ёлка была установлена только в 1938 году. Простые ежедневные упражнения помогут достичь успеха. Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Достичь успеха помогут ежедневные повторения. Он написал больше 30 хитов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Ещё никогда Штирлиц не был так близок к провалу. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой. Смеркалось.`,
    createdDate: `2020-08-04 12:17:31`,
    category: `Фронтенд\nСоцсети\nКоты\nБез рамки\nРазное\nIT\nЖелезо\nПрограммирование\nДеревья\nДети\nОтношения`,
    comments: [
      {
        id: `CsWwd_`,
        text: `Плюсую, но слишком много буквы! Совсем немного... Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему? Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили."`
      },
      {
        id: `aFQAn0`,
        text: `Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты? Хочу такую же футболку :-)"`
      },
      {
        id: `88GKtN`,
        text: `Это где ж такие красоты? Совсем немного... Плюсую, но слишком много буквы! Согласен с автором! Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Мне кажется или я уже читал это где-то?"`
      },
      {
        id: `dzY-EB`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором! Это где ж такие красоты? Хочу такую же футболку :-) Совсем немного... Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили."`
      },
      {
        id: `Fnsg38`,
        text: `Хочу такую же футболку :-) Это где ж такие красоты? Совсем немного... Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Согласен с автором!"`
      },
      {
        id: `VNCm7H`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то? Это где ж такие красоты? Совсем немного..."`
      }
    ]
  },
  {
    id: `6Fx-WC`,
    title: `Борьба с прокрастинацией`,
    announce: `Кролики — это не только ценный мех, но и 3-4 кг диетического легкоусвояемого мяса. Программировать не настолько сложно, как об этом говорят. Смеркалось. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    fullText: `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Не сделано — и переделывать не придется. Это один из лучших рок-музыкантов. Ёлки — это не просто красивое дерево. Это прочная древесина. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Из под его пера вышло 8 платиновых альбомов. Сижу за решеткой в темнице сырой. Вскормлённый в неволе орёл молодой... Как начать действовать? Для начала просто соберитесь. Дуракам закон не писан. Простые ежедневные упражнения помогут достичь успеха. Он написал больше 30 хитов. Первая большая ёлка была установлена только в 1938 году. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Достичь успеха помогут ежедневные повторения. Смеркалось. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Золотое сечение — соотношение двух величин, гармоническая пропорция. Не было бы счастья, да несчастье помогло. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    createdDate: `2020-10-05 12:17:31`,
    category: `Музыка\nПрограммирование\nРоссия\nСоцсети\nЗа жизнь\nРазное`,
    comments: [
      {
        id: `PkuA53`,
        text: `Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Совсем немного... Согласен с автором! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили."`
      },
      {
        id: `2887uh`,
        text: `Совсем немного... Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Согласен с автором! Мне кажется или я уже читал это где-то?"`
      },
      {
        id: `RpeAzv`,
        text: `Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то? Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты? Совсем немного..."`
      },
      {
        id: `3804s3`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Совсем немного... Это где ж такие красоты? Планируете записать видосик на эту тему? Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили."`
      },
      {
        id: `nod4fK`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему? Согласен с автором! Совсем немного... Это где ж такие красоты? Хочу такую же футболку :-) Плюсую, но слишком много буквы!"`
      },
      {
        id: `TIsdEi`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты? Хочу такую же футболку :-) Совсем немного... Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то?"`
      },
      {
        id: `375KVw`,
        text: `Хочу такую же футболку :-) Плюсую, но слишком много буквы! Совсем немного... Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты?"`
      }
    ]
  },
  {
    id: `EWVMAT`,
    title: `Колобок, том 2`,
    announce: `Как начать действовать? Для начала просто соберитесь. Первая большая ёлка была установлена только в 1938 году. Достичь успеха помогут ежедневные повторения. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    fullText: `Простые ежедневные упражнения помогут достичь успеха. Программировать не настолько сложно, как об этом говорят. Ещё никогда Штирлиц не был так близок к провалу. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Он написал больше 30 хитов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Не было бы счастья, да несчастье помогло. Первая большая ёлка была установлена только в 1938 году. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Золотое сечение — соотношение двух величин, гармоническая пропорция. Не сделано — и переделывать не придется. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Это один из лучших рок-музыкантов. Из под его пера вышло 8 платиновых альбомов. Кролики — это не только ценный мех, но и 3-4 кг диетического легкоусвояемого мяса. Собрать камни бесконечности легко, если вы прирожденный герой. Дуракам закон не писан. Как начать действовать? Для начала просто соберитесь. Сижу за решеткой в темнице сырой. Вскормлённый в неволе орёл молодой... Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    createdDate: `2020-10-14 12:17:31`,
    category: `Россия\nПрограммирование`,
    comments: [
      {
        id: `-IKAeE`,
        text: `Совсем немного... Хочу такую же футболку :-) Планируете записать видосик на эту тему? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то? Согласен с автором!"`
      },
      {
        id: `xHgWLu`,
        text: `Это где ж такие красоты? Согласен с автором! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему? Совсем немного... Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы!"`
      },
      {
        id: `vI8JPR`,
        text: `Мне кажется или я уже читал это где-то? Это где ж такие красоты? Совсем немного... Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-) Согласен с автором!"`
      },
      {
        id: `W60z-R`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Согласен с автором! Планируете записать видосик на эту тему? Совсем немного... Мне кажется или я уже читал это где-то? Хочу такую же футболку :-)"`
      },
      {
        id: `nalVk5`,
        text: `Плюсую, но слишком много буквы! Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то? Хочу такую же футболку :-) Совсем немного... Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете."`
      }
    ]
  },
  {
    id: `L7m2IG`,
    title: `Интересные события в Санкт-Петербурге`,
    announce: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры. Ещё никогда Штирлиц не был так близок к провалу. Кролики — это не только ценный мех, но и 3-4 кг диетического легкоусвояемого мяса. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    fullText: `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.\nВы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    createdDate: `2020-08-20 12:17:31`,
    category: `Деревья\nСоцсети\nДеньги\nКино\nКоты`,
    comments: [
      {
        id: `HXNRmN`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему? Совсем немного... Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то? Согласен с автором! Это где ж такие красоты?"`
      }
    ]
  }
];
const expectedCategoriesList = [`IT`, `Без рамки`, `Деньги`, `Деревья`, `Дети`, `Железо`, `За жизнь`, `Кино`, `Коты`, `Музыка`, `Отношения`, `Программирование`, `Разное`, `Россия`, `Соцсети`, `Фронтенд`];

const app = express();
app.use(express.json());
categories(app, new CategoriesService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCodes.OK));
  test(`Returns list of 16 categories`, () => expect(response.body.length).toBe(16));
  test(`Category names are "${expectedCategoriesList.join(`", "`)}"`, () => {
    expect(response.body).toEqual(expect.arrayContaining(expectedCategoriesList));
  });
});
