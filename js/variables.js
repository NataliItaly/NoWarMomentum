const BODY = document.querySelector('body');
const TIME = document.querySelector('.time');
const DATE = document.querySelector('.date');
const GREETING = document.querySelector('.greeting');
const VIDEO = document.querySelector('.video');
const warsDayCount = document.querySelector('.wars-day-count');
const nameInput = document.querySelector('.name');
const showWeatherBlock = document.querySelector('.weather__btn');
const showWeatherBtn = document.querySelector('.weather__show-btn');
const weatherWrapper = document.querySelector('.weather');
const weather = document.querySelector('.weather__popup');
const weatherIcon = document.querySelector('.weather__icon');
const temperature = document.querySelector('.weather__temperature');
const weatherDescription = document.querySelector('.weather__description');
const wind = document.querySelector('.weather__wind');
const humidity = document.querySelector('.weather__humidity');
const weatherCityInput = document.querySelector('.weather__city');
const weatherError = document.querySelector('.weather__error');
const QUOTE = document.querySelector('.quote__text');
const AUTHOR = document.querySelector('.quote__author');
const changeQuote = document.querySelector('.change-quote');
const playBtn = document.querySelector('.play');
const changeLanguageBtn = document.querySelector('.change-language-btn');
const translationBtnWrapper = document.querySelector(
  '.translation-btn-wrapper'
);
const translationBtn = document.querySelectorAll('.translation-btn');

const quotes = {
  it: [
    {
      text: "La gente pensa che se chiamano il crimine di omicidio 'guerra', allora l'omicidio non è un crimine.",
      author: 'Lev Tolstoy',
    },
    {
      text: 'La guerra ... la considero disgustosa, ma ancora più disgustosi per me sono coloro che cantano la guerra senza parteciparvi.',
      author: 'Romain Rolland',
    },
    {
      text: "La guerra e la conquista, da un lato, e il crescente dispotismo, dall'altro, si aiutano reciprocamente: da un popolo composto da schiavi, si può liberamente prendere denaro e persone per conquistare altre nazioni con il loro aiuto.",
      author: 'Jean-Jacques Rousseau',
    },
    {
      text: 'La guerra fornisce allo stesso tempo un pretesto per nuove esazioni monetarie e un pretesto altrettanto plausibile per mantenere costantemente numerosi eserciti per tenere a bada il proprio popolo.',
      author: 'Jean-Jacques Rousseau',
    },
    {
      text: 'La guerra per i popoli è lacrime e sangue, sono vedove e randagi, è un nido distrutto, una giovinezza perduta e una vecchiaia insultata',
      author: 'Ilya Ehrenburg',
    },
    {
      text: 'Le guerre sono una malvagità glorificata.',
      author: 'Seneca',
    },
    {
      text: "O l'umanità finirà la guerra o la guerra finirà l'umanità.",
      author: 'John F. Kennedy',
    },
    {
      text: 'La guerra impone ugualmente tributi sia agli uomini che alle donne, ma solo ad alcuni addebita sangue, ad altri – lacrime.',
      author: 'William Thackeray',
    },
    {
      text: "La guerra è una negazione della verità e dell'umanità. Non si tratta solo di uccidere le persone, perché una persona deve morire in un modo o nell'altro, ma anche di diffondere deliberatamente e ostinatamente l'odio e le bugie che vengono gradualmente instillate nelle persone.",
      author: 'Jawaharlal Nehru',
    },
    {
      text: 'Il conquistatore è un pazzo che inizia con la rovina dei suoi sudditi per avere il piacere di rovinare i sudditi stranieri.',
      author: 'Pierre Boiste',
    },
    {
      text: 'Nessuna guerra è ancora iniziata senza grida isteriche per la pace.',
      author: 'Stas Yankovskiy',
    },
    {
      text: "I pericoli più spaventosi che minacciano l'umanità sono la Grande Guerra suicida e la tirannia assoluta.",
      author: 'Daniil Andreyev',
    },
    {
      text: 'La prima vittima della guerra è la verità.',
      author: 'Hewlett Johnson',
    },
    {
      text: 'Un leader che non pensa prima di mandare il suo popolo a combattere non è degno di essere un leader.',
      author: 'Golda Meir',
    },
    {
      text: 'Eroismo a comando, crudeltà insensata e assurdità macabra chiamata patriottismo — quanto odio tutto questo, quanto è bassa e cattiva la guerra. Preferirei essere fatto a pezzi piuttosto che far parte di questa azione disordinata. Sono convinto che uccidere con il pretesto della guerra non cessa di essere un omicidio.',
      author: 'Albert Einstein',
    },
    {
      text: "L'invasione di un paese vicino viene solitamente effettuata a beneficio dei suoi cittadini.",
      author: 'Boris Kriger',
    },
    {
      text: 'Non conosco nessun popolo che si arricchisca a causa della vittoria.',
      author: 'Voltaire',
    },
    {
      text: 'Perché tutti coloro che prendono la spada periranno con la spada',
      author: 'Vangelo di Matteo',
    },
    { text: 'Non uccidere', author: 'Signore' },
    {
      text: 'È impossibile cercare di prevenire e prepararsi alla guerra allo stesso tempo.',
      author: 'Albert Einstein',
    },
    {
      text: 'Un popolo che ha il diritto di scegliere sceglierà sempre il mondo.',
      author: 'Ronald Reagan',
    },
  ],
  ru: [
    {
      text: "Люди думают, что если они назовут преступление убийства 'войною', то убийство перестанет быть преступлением.",
      author: 'ЛЕВ ТОЛСТОЙ',
    },
    {
      text: 'Война… Я считаю ее отвратительной, но еще отвратительней мне кажутся те, кто воспевает ее, в ней не участвуя. ',
      author: 'РОМЕН РОЛЛАН',
    },
    {
      text: 'Война и завоевания, с одной стороны, и усугубляющийся деспотизм — с другой, взаимно помогают друг другу: у народа, состоящего из рабов, можно вволю брать деньги и людей, чтобы с их помощью покорять другие народы.',
      author: 'ЖАН-ЖАК РУССО',
    },
    {
      text: 'Война дает одновременно и предлог для новых денежных поборов, и не менее благовидный предлог для того, чтобы постоянно содержать многочисленные армии, дабы держать народ в страхе.',
      author: 'ЖАН-ЖАК РУССО',
    },
    {
      text: 'Война для народов – это слезы и кровь, это вдовы и беспризорные, это раскиданное гнездо, погибшая молодость и оскорбленная старость.',
      author: 'ИЛЬЯ ЭРЕНБУРГ',
    },
    {
      text: 'Войны — это прославляемое злодейство.',
      author: 'СЕНЕКА',
    },
    {
      text: 'Либо человечество покончит с войной, либо война покончите человечеством.',
      author: 'Д. КЕННЕДИ',
    },
    {
      text: 'Война в одинаковой мере облагает данью и мужчин, и женщин, но только с одних взимает кровь, с других – слезы.',
      author: 'УИЛЬЯМ ТЕККЕРЕЙ',
    },
    {
      text: 'Война является отрицанием истины и гуманности. Дело не только в убийстве людей, ибо человек должен так или иначе умереть, а в сознательном и упорном распространении ненависти и лжи, которые мало помалу прививаются людям.',
      author: 'ДЖАВАХАРЛАЛ НЕРУ',
    },
    {
      text: 'Завоеватель — безумец, начинающий с разорения своих подданных для того, чтобы иметь удовольствие разорить чужих подданных.',
      author: 'Пьер БУАСТ',
    },
    {
      text: 'Еще ни одной войны не начиналось без истеричных криков о мире.',
      author: 'СТАС ЯНКОВСКИЙ',
    },
    {
      text: 'Самые устрашающие опасности, которые грозят человечеству сейчас и будут грозить еще не одно столетие, – это великая самоубийственная война и абсолютная тирания.',
      author: 'ДАНИИЛ АНДРЕЕВ',
    },
    {
      text: 'Первой жертвой войны становится правда.',
      author: 'X. ДЖОНСОН',
    },
    {
      text: 'Лидер, который не задумается прежде, чем пошлёт свой народ сражаться, не достоин быть лидером.',
      author: 'ГОЛДА МЕИР',
    },
    {
      text: 'Героизм по команде, бессмысленная жестокость и омерзительная бессмысленность, называющаяся патриотизмом — как сильно я ненавижу всё это, какой низкой и подлой является война. Я предпочел бы быть разорванным на куски, чем быть частью этого грязного действа. Я убеждён, что убийство под предлогом войны не перестает быть убийством.',
      author: 'АЛЬБЕРТ ЭЙНШТЕЙН',
    },
    {
      text: 'Вторжение в соседнюю страну обычно совершается во благо её граждан.',
      author: 'БОРИС КРИГЕР',
    },
    {
      text: 'Я не знаю ни одного народа, который обогатился бы вследствие победы.',
      author: 'ВОЛЬТЕР',
    },
    {
      text: 'Ибо все, взявшие меч, мечом погибнут',
      author: 'Евангелиe от Матфея',
    },
    { text: "Не убий.Don 't kill.Non uccidere", author: 'Бог' },
    {
      text: 'Невозможно одновременно пытаться предотвратить войну и готовиться к ней.',
      author: 'Альберт Эйнштейн',
    },
    {
      text: 'Народ, у которого есть право выбора, всегда выберет мир.',
      author: 'Рональд Рейган',
    },
  ],
  en: [
    {
      text: "People think that if they call the crime of murder 'war', then murder will cease to be a crime.",
      author: 'Lev Tolstoy',
    },
    {
      text: 'War… I find it disgusting, but even more disgusting to me are those who invoke war without participating in it.',
      author: 'Romain Rolland',
    },
    {
      text: 'War and conquest, on the one hand, and worsening despotism, on the other, mutually help each other: from a people consisting of slaves, you can take money and people to conquer other nations with their help.',
      author: 'Jean-Jacques Rousseau',
    },
    {
      text: 'The war provides both a pretext for new monetary extortion, and an equally plausible excuse for constantly maintaining numerous armies in order to keep the people in fear.',
      author: 'Jean-Jacques Rousseau',
    },
    {
      text: "War for nations is tears and blood, it's widows and homeless, it's a ruined homes, lost youth and insulted old age.",
      author: 'Ilya Ehrenburg',
    },
    {
      text: 'Wars are glorified villainy.',
      author: 'Seneca',
    },
    {
      text: 'Either humanity will end the war, or the war will end humanity.',
      author: 'John F. Kennedy',
    },
    {
      text: 'War imposes tribute on both men and women equally, but it only takes blood from ones, tears from others.',
      author: 'William Thackeray',
    },
    {
      text: "War is a denial of truth and humanity. It's not just about killing people, because a person must die one way or another, but in the deliberate and persistent spread of hatred and lies, which are gradually instilled in people.",
      author: 'Jawaharlal Nehru',
    },
    {
      text: "A conqueror is a madman who begins by ruining his subjects in order to have the pleasure of ruining other people's subjects.",
      author: 'Pierre Boiste',
    },
    {
      text: 'No war has ever started without hysterical cries for peace.',
      author: 'Stas Yankovskiy',
    },
    {
      text: 'The most terrifying dangers that threaten humanity now and will threaten for centuries to come are the great suicidal war and absolute tyranny.',
      author: 'Daniil Andreyev',
    },
    {
      text: 'The first victim of the war is the truth.',
      author: 'Hewlett Johnson',
    },
    {
      text: 'A leader who does not think twice before sending his people to fight is not worth to be a leader',
      author: 'Golda Meir',
    },
    {
      text: 'Heroism on command, senseless cruelty and disgusting senselessness called patriotism — how much I hate all this, how low and vile war is. I would rather be torn to pieces than be a part of this dirty action. I am convinced that murder under the pretext of war does not cease to be murder.',
      author: 'Albert Einstein',
    },
    {
      text: 'An invasion of a neighboring country is usually carried out for the benefit of its citizens.',
      author: 'Boris Kriger',
    },
    {
      text: "I don't know any nation that was be enriched as a result of war.",
      author: 'Voltaire',
    },
    {
      text: 'For all who take the sword will perish by the sword.',
      author: 'Gospel of Matthew',
    },
    { text: "Don 't kill.", author: 'God' },
    {
      text: 'It is impossible to simultaneously try to prevent a war and prepare for it.È impossibile cercare di prevenire e prepararsi alla guerra allo stesso tempo.',
      author: 'Albert Einstein',
    },
    {
      text: 'The people who have the right to choose will always choose peace.',
      author: 'Ronald Reagan',
    },
  ],
};

const trackList = [
  {
    title: 'Rob D  Clubbed To Death',
    src: 'assets/sounds/Rob D  Clubbed To Death.mp3',
  },
  {
    title: 'Okean Elzi Obiymi mene',
    src: 'assets/sounds/Okean Eelzi Obiymi mene.mp3',
  },
  {
    title: 'The Prodigy Voodoo people',
    src: 'assets/sounds/The Prodigy Voodoo people.mp3',
  },
  {
    title: 'Okean Elzi Ne tvoya viyna',
    src: 'assets/sounds/Okean Elz Ne tvoya viyna.mp3',
  },
  {
    title: 'Visotskiy Soldatadi Gruppi Tsentr',
    src: 'assets/sounds/Visotskiy Soldatadi Gruppi Tsentr.mp3',
  },
  {
    title: 'Zemfira Ne strelyayte',
    src: 'assets/sounds/Zemfira Ne strelyayte.mp3',
  },
  {
    title: 'Nogu Svelo Ukraina',
    src: 'assets/sounds/Nogu Svelo Ukraina.mp3',
  },
];
