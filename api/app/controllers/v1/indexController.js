let util = require('util')
let rxdata = {}

function controller (res) { this.res = res; rxController.call(this, res); rxdata = res.data }
util.inherits(controller, rxController)

controller.prototype.index = function () {
  rxdata.renderjson({
    'status': 'ok',
    'totalResults': 21611,
    'articles': [
      {
        'source': {
          'id': 'wired',
          'name': 'Wired'
        },
        'author': null,
        'title': 'Nobody’s Watching the Best Giant-Monster Movies',
        'description': '"Colossal," "A Monster Calls," and "I Kill Giants" are terrific sci-fi films with weird, big themes. They all failed to connect with audiences.',
        'url': 'https://www.wired.com/2019/08/geeks-guide-monster-movies',
        'urlToImage': null,
        'publishedAt': '2019-08-24T13:00:00Z',
        'content': null
      },
      {
        'source': {
          'id': null,
          'name': 'Lifehacker.com'
        },
        'author': 'Emily Price',
        'title': "Watch Free Movies on Your Phone With IMDb's New App",
        'description': 'IMDb launched IMDb TV earlier this year, a streaming service that allows you to watch some programming for free through IMDb’s website. Today the company announced that it’s bringing IMDb TV to its mobile app as well, giving you the ability to stream all that…',
        'url': 'https://lifehacker.com/watch-free-movies-on-your-phone-with-imdbs-new-app-1837592358',
        'urlToImage': 'https://i.kinja-img.com/gawker-media/image/upload/s--Lj9PF9Ek--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/w4s862xa7voixnpep5pz.jpg',
        'publishedAt': '2019-08-26T21:05:00Z',
        'content': 'IMDb launched IMDb TV earlier this year, a streaming service that allows you to watch some programming for free through IMDbs website. Today the company announced that its bringing IMDb TV to its mobile app as well, giving you the ability to stream all that c… [+603 chars]'
      },
      {
        'source': {
          'id': null,
          'name': 'Lifehacker.com'
        },
        'author': 'Emily Price',
        'title': 'Read Unpublished Walt Whitman Poems While Helping Transcribe Things For the Library of Congress',
        'description': 'The Library of Congress can be a great place to find everything from free movies and books to epic public-domain pictures of cats. Read more...',
        'url': 'https://lifehacker.com/read-unpublished-walt-whitman-poems-while-helping-trans-1837337310',
        'urlToImage': 'https://i.kinja-img.com/gawker-media/image/upload/s--FI4kICDC--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/z4h0mhwydjcokk80rede.jpg',
        'publishedAt': '2019-08-17T21:37:00Z',
        'content': 'The Library of Congress can be a great place to find everything from free movies and books to epic public-domain pictures of cats.\r\nOne key step in getting all that great content online: it needs to be digitized. When it comes to things like old letters and w… [+1323 chars]'
      },
      {
        'source': {
          'id': 'wired',
          'name': 'Wired'
        },
        'author': 'Peter Rubin',
        'title': 'Spider-Man Swings Back to Sony—Unraveling the Universe',
        'description': "It's not about what's good for Spider-Man. It's about the fate of comic-book movies—which might be doomed.",
        'url': 'https://www.wired.com/story/spider-man-sony-disney-future-of-comic-book-movies/',
        'urlToImage': 'https://media.wired.com/photos/5d5e005fc054810008635995/master/w_1280,c_limit/Culture_SpiderMan_DF-07090_rv2.jpg',
        'publishedAt': '2019-08-22T19:06:48Z',
        'content': 'If you thought superhero movie titles were getting too long, try fitting Into the Contract-Verse: The Curious Case of Spider-Man and the Film Rights Impasse on a theater marquee. After months of negotiations between Sony Pictures and Disney, it appears that S… [+3716 chars]'
      },
      {
        'source': {
          'id': null,
          'name': 'Lifehacker.com'
        },
        'author': 'Emily Price',
        'title': "What's Coming and Going From HBO in September 2019",
        'description': 'September will bring a ton of new movies and TV shows to HBO, including The Lego Movie 2: The Second Part, as well as Love Actually, and the director’s cut of the 1987 classic, Robocop. Read more...',
        'url': 'https://lifehacker.com/whats-coming-and-going-from-hbo-in-september-2019-1837647445',
        'urlToImage': 'https://i.kinja-img.com/gawker-media/image/upload/s--bJTaSIGb--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/jsiik5tvflr39dqerkul.jpg',
        'publishedAt': '2019-08-30T17:30:00Z',
        'content': 'September will bring a ton of new movies and TV shows to HBO, including The Lego Movie 2: The Second Part, as well as Love Actually, and the directors cut of the 1987 classic, Robocop.\r\nHowever, if youve been waiting to have a Psycho marathon, now is the time… [+2647 chars]'
      },
      {
        'source': {
          'id': 'techcrunch',
          'name': 'TechCrunch'
        },
        'author': 'Sarah Perez',
        'title': 'Roku launches a Kids & Family section on The Roku Channel, plus parental controls',
        'description': 'Roku’s home entertainment hub, The Roku Channel, is expanding into kids’ programming. The company this morning announced plans to aggregate kids and family movies and TV alongside the channel’s other content, including its free, ad-supported movies and televi…',
        'url': 'http://techcrunch.com/2019/08/19/roku-launches-a-kids-family-section-on-the-roku-channel-plus-parental-controls/',
        'urlToImage': 'https://techcrunch.com/wp-content/uploads/2019/08/TRC-Kids-and-Family_Lifestyle.jpeg?w=764',
        'publishedAt': '2019-08-19T13:02:52Z',
        'content': 'Roku’s home entertainment hub, The Roku Channel, is expanding into kids’ programming. The company this morning announced plans to aggregate kids and family movies and TV alongside the channel’s other content, including its free, ad-supported movies and televi… [+4338 chars]'
      },
      {
        'source': {
          'id': 'engadget',
          'name': 'Engadget'
        },
        'author': 'Steve Dent',
        'title': 'Disney+ docu-series will focus on the people behind its movies and parks',
        'description': "Disney+ will have access to Disney, Pixar, Marvel and Fox's impressive film library, but it needs a wide variety of other content to compete with Netflix's endless scroll. The entertainment giant has dropped a clue at what we can expect to see with the launch…",
        'url': 'https://www.engadget.com/2019/08/23/one-day-at-disney-stream-docu-series/',
        'urlToImage': 'https://o.aolcdn.com/images/dims?thumbnail=1200%2C630&quality=80&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D5713%252C3286%252C0%252C351%26quality%3D85%26format%3Djpg%26resize%3D1600%252C920%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-images%252F2019-08%252F5da3ae30-c57e-11e9-b97f-8579d8f3047d%26client%3Da1acac3e1b3290917d92%26signature%3Db04a09307560d3ba3074d1a7bd077aceca4522a7&client=amp-blogside-v2&signature=0b41abbfad30daf50b2ba4be3c04643bd5ac75d8',
        'publishedAt': '2019-08-23T09:02:00Z',
        'content': "\"This exciting new series takes an in-depth look at the unique and surprising roles these men and women call their daily jobs,\" the company said in a press release. Fans of Disney's theme parks, animation, art and VFX will no doubt geek out over the series, w… [+423 chars]"
      },
      {
        'source': {
          'id': 'mashable',
          'name': 'Mashable'
        },
        'author': 'Saavon Smalls',
        'title': 'Here’s TorrentFreak’s top 10 (sorta) most pirated movies',
        'description': 'The list accidentally has a film in two spots, so technically this is a list of nine. Read more... More about Entertainment, Movies, Mashable Video, Torrentfreaks, and Pirated Movies',
        'url': 'https://mashable.com/video/top-10-pirated-movies-torrent-freak/',
        'urlToImage': 'https://mondrian.mashable.com/2019%252F08%252F27%252Fd1%252F5a017920c7724115b95597cb497a4ecc.1b62a.png%252F1200x630.png?signature=CsZJ6CTeHD4SAKKquJhKFNZ6QCA=',
        'publishedAt': '2019-08-27T19:29:31Z',
        'content': null
      },
      {
        'source': {
          'id': 'the-verge',
          'name': 'The Verge'
        },
        'author': 'Chris Welch',
        'title': 'The Roku Channel is adding a kids and family section with free TV shows and movies',
        'description': 'The Roku Channel currently offers a mix of free-to-watch, ad-supported movies, TV shows, and live news. And now, Roku is adding a new section to the Roku Channel that’s focused on kid and family content.',
        'url': 'https://www.theverge.com/2019/8/19/20811189/roku-channel-kids-family-section-free-streaming',
        'urlToImage': 'https://cdn.vox-cdn.com/thumbor/R1TKH8tnB6UT-h_IqQ4upBUmIfI=/38x0:1016x512/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/19020024/TRC_Kids_and_Family_Lifestyle.jpeg',
        'publishedAt': '2019-08-19T13:00:00Z',
        'content': 'Curated by humans, not algorithms\r\nImage: Roku\r\nThe Roku Channel currently offers a mix of free-to-watch, ad-supported movies, TV shows, and live news. You can also purchase subscriptions to HBO, Showtime, Starz, Epix, and other networks through the Roku Chan… [+1843 chars]'
      },
      {
        'source': {
          'id': null,
          'name': 'Lifehacker.com'
        },
        'author': 'Nick Douglas',
        'title': "What's Coming and Going From Netflix in September 2019",
        'description': 'This month, Netflix gets the movies American Psycho, Mystic River, Superbad, 300, The Taking of Pelham 123, and the second and third Lord of the Rings films. (You can’t get Fellowship on Netflix. Weird!) In TV, there’s season 9 of The Walking Dead, season 9 o…',
        'url': 'https://lifehacker.com/whats-coming-and-going-from-netflix-in-september-2019-1837440601',
        'urlToImage': 'https://i.kinja-img.com/gawker-media/image/upload/s--aF9qHRkx--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/qs9o9gsmoxsqhe8dhzaz.jpg',
        'publishedAt': '2019-08-21T14:49:00Z',
        'content': 'This month, Netflix gets the movies American Psycho, Mystic River, Superbad, 300, The Taking of Pelham 123, and the second and third Lord of the Rings films. (You cant get Fellowship on Netflix. Weird!) In TV, theres season 9 of The Walking Dead, season 9 of … [+4417 chars]'
      },
      {
        'source': {
          'id': 'mashable',
          'name': 'Mashable'
        },
        'author': 'Saavon Smalls',
        'title': "Here's what’s leaving Netflix in September",
        'description': 'The titles include Disney films, a few series, and a "Superman" classic. Read more... More about Entertainment, Movies, Netflix, Mashable Video, and Streaming',
        'url': 'https://mashable.com/video/whats-leaving-netflix-sept-2019/',
        'urlToImage': 'https://mondrian.mashable.com/2019%252F08%252F23%252F2a%252F4418c4ae95d340f280a298bb56243957.21e4a.png%252F1200x630.png?signature=JYN_BLkR_JvSCbdEKdOMwu_mKaw=',
        'publishedAt': '2019-08-23T17:45:00Z',
        'content': null
      },
      {
        'source': {
          'id': 'mashable',
          'name': 'Mashable'
        },
        'author': 'Saavon Smalls',
        'title': 'Here’s what’s coming to Amazon Prime Video in September 2019',
        'description': 'Among them include "Election," the live-action "Aladdin," and "Saturday Night Fever." Read more here. Read more... More about Entertainment, Movies, Amazon, Mashable Video, and Amazon Prime',
        'url': 'https://mashable.com/video/amazon-prime-sept-2019/',
        'urlToImage': 'https://mondrian.mashable.com/2019%252F08%252F21%252Ff2%252F17274336558641aa8c307ef3e3172c8a.56f25.png%252F1200x630.png?signature=yjd9lJxETLw-ofoNdRFPBPF-k0w=',
        'publishedAt': '2019-08-21T17:33:10Z',
        'content': 'Among them include "Election," the live-action "Aladdin," and "Saturday Night Fever."\r\nRead more here.'
      },
      {
        'source': {
          'id': 'the-verge',
          'name': 'The Verge'
        },
        'author': 'Caroline Siede',
        'title': 'An MCU breakup could be a terrific step forward for Spider-Man',
        'description': 'A profit-sharing dispute between Disney and Sony, which threatens to pull Marvel Studios away from producing further Spider-Man stories, might actually be a good thing. Free of the Marvel Cinematic Universe, the Tom Holland Spider-Man movies could finally foc…',
        'url': 'https://www.theverge.com/2019/8/21/20827064/marvel-mcu-sony-disney-dispute-tony-stark-iron-man-future-of-spider-man-movies',
        'urlToImage': 'https://cdn.vox-cdn.com/thumbor/pt5bbXnL-ikQY-beUhfQWims1nc=/0x86:3151x1736/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/19084512/TonyPeter.jpg',
        'publishedAt': '2019-08-21T19:49:05Z',
        'content': 'The Disney / Sony dispute might actually free Spider-Man for less franchise-focused stories\r\nWarning: This essay contains spoilers for Avengers: Endgame and Spider-Man: Far From Home.\r\nInterviews with the filmmakers behind the Marvel Cinematic Universe almost… [+8924 chars]'
      },
      {
        'source': {
          'id': 'the-verge',
          'name': 'The Verge'
        },
        'author': 'Chaim Gartenberg',
        'title': 'Sony pulls Spider-Man out of the MCU over profit-sharing dispute with Disney',
        'description': 'Marvel Studios will no longer be a part of future Spider-Man movies, due to disputes between Sony — which still holds the rights to the character — and Marvel’s parent company Disney over revenue sharing from films starring the web-slinging hero.',
        'url': 'https://www.theverge.com/2019/8/20/20825580/marvel-studios-future-spider-man-films-disney-sony-fight-kevin-feige-mcu',
        'urlToImage': 'https://cdn.vox-cdn.com/thumbor/a0a7RvfO4corueOTT5QHiXFs928=/0x370:5701x3355/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/18280202/MJMoment.jpg',
        'publishedAt': '2019-08-20T21:23:29Z',
        'content': 'Sonys cooperation with Marvel is over for the moment\r\nPhoto: Sony Pictures Entertainment\r\nMarvel Studios president Kevin Feige has pulled out of producing future Spider-Man movies, due to disputes between Sony which still holds the rights to the character and… [+3056 chars]'
      },
      {
        'source': {
          'id': 'the-verge',
          'name': 'The Verge'
        },
        'author': 'Dami Lee',
        'title': 'Netflix will release 10 fall films in theaters, well ahead of their streaming debuts',
        'description': 'Netflix has revealed its fall film lineup, which includes 10 movies that will get an exclusive theatrical release window before being made available to subscribers a few weeks later. The list includes Steven Soderbergh’s The Laundromat, and Martin Scorsese’s …',
        'url': 'https://www.theverge.com/2019/8/27/20835697/netflix-fall-movie-lineup-theatrical-release-steven-soderbergh-laundromat-martin-scorsese-irishman',
        'urlToImage': 'https://cdn.vox-cdn.com/thumbor/dkWqhjPzm9apNDub6Y8f8GYwr9w=/0x19:928x505/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/19123799/nyff57_mainslate_theirishman_01_credit__niko_tavernise_netflix_h_2019.jpg',
        'publishedAt': '2019-08-27T21:49:11Z',
        'content': 'Including Steven Soderberghs The Laundromat andMartin Scorseses The Irishman\r\nAfter months-long negotiations between Netflix and major theater chains, Martin Scorseses The Irishman, starring Robert De Niro and Al Pacino, will get a November 1st theatrical deb… [+2876 chars]'
      },
      {
        'source': {
          'id': 'techcrunch',
          'name': 'TechCrunch'
        },
        'author': 'Sarah Perez',
        'title': 'Plex is launching its own ad-supported video service, starting with content from Warner Bros. TV',
        'description': 'Streaming media company Plex this morning announced it will begin to offer ad-supported video, including movies and TV, by way of a new content agreement with Warner Bros. Domestic Television Distribution. Though Plex has more recently expanded into new areas…',
        'url': 'http://techcrunch.com/2019/08/29/plex-is-launching-its-own-ad-supported-video-service-starting-with-content-from-warner-bros-tv/',
        'urlToImage': 'https://techcrunch.com/wp-content/uploads/2019/08/plex-live-tv.jpg?w=600',
        'publishedAt': '2019-08-29T13:13:03Z',
        'content': 'Streaming media company Plex this morning announced it will begin to offer ad-supported video, including movies and TV, by way of a new content agreement with Warner Bros. Domestic Television Distribution. Though Plex has more recently expanded into new areas… [+2878 chars]'
      },
      {
        'source': {
          'id': 'the-verge',
          'name': 'The Verge'
        },
        'author': 'Chaim Gartenberg',
        'title': 'Google search is getting personalized TV and movie recommendations',
        'description': 'Google is adding personalized TV and movie recommendations to search, in hopes of solving the age old question: what do you actually want to watch? Now, when you search Google for things like “good shows to watch” or “what to watch,” there’ll be a new carouse…',
        'url': 'https://www.theverge.com/2019/9/5/20837315/google-search-personalized-tv-show-movie-recommendations-what-to-watch',
        'urlToImage': 'https://cdn.vox-cdn.com/thumbor/KfKyLlO6QVRFPaw_0b_9bet3Dn4=/0x96:1532x898/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/19169943/Screen_Shot_2019_09_05_at_8.05.43_AM.png',
        'publishedAt': '2019-09-05T12:06:20Z',
        'content': 'Theyll show up directly in search\r\nGoogle is adding personalized TV and movie recommendations to search, in hopes of solving the age old question: what do you actually want to watch?\r\nNow, when you search Google for things like good shows to watch or what to … [+872 chars]'
      },
      {
        'source': {
          'id': 'techcrunch',
          'name': 'TechCrunch'
        },
        'author': 'Sarah Perez',
        'title': 'Netflix tests human-driven curation with launch of ‘Collections’',
        'description': 'Netflix is testing a new way to help users find TV shows and movies they’ll want to watch with the launch of a “Collections” feature, currently in testing on iOS devices. While Netflix today already offers thematic suggestions of things to watch, based on you…',
        'url': 'http://techcrunch.com/2019/08/23/netflix-tests-human-driven-curation-with-launch-of-collections/',
        'urlToImage': 'https://techcrunch.com/wp-content/uploads/2019/08/ECp6oENX4AA2E6E.jpeg?w=620',
        'publishedAt': '2019-08-23T17:59:38Z',
        'content': 'Netflix is testing a new way to help users find TV shows and movies they’ll want to watch with the launch of a “Collections” feature, currently in testing on iOS devices. While Netflix today already offers thematic suggestions of things to watch, based on you… [+2869 chars]'
      },
      {
        'source': {
          'id': 'techcrunch',
          'name': 'TechCrunch'
        },
        'author': 'Sarah Perez',
        'title': 'Google’s new feature will help you find something to watch',
        'description': 'Google Search can now help you find your next binge. The company this morning announced a new feature which will make personalized recommendations of what to watch, including both TV shows and movies, and point you to services where the content is available. …',
        'url': 'http://techcrunch.com/2019/09/05/googles-new-feature-will-help-you-find-something-to-watch/',
        'urlToImage': 'https://techcrunch.com/wp-content/uploads/2019/09/google-search-app-ios.jpg?w=745',
        'publishedAt': '2019-09-05T18:33:52Z',
        'content': 'Google Search can now help you find your next binge. The company this morning announced a new feature which will make personalized recommendations of what to watch, including both TV shows and movies, and point you to services where the content is available.\r… [+2478 chars]'
      },
      {
        'source': {
          'id': 'techcrunch',
          'name': 'TechCrunch'
        },
        'author': 'Greg Kumparak',
        'title': '“Filmmaker Mode” will automatically turn off all the dumb motion smoothing and noise reduction on new TVs',
        'description': 'Most people don’t adjust the settings on their TV after they buy it. Most newer TVs, meanwhile, come with a bunch of random junk turned on by default; things like motion smoothing that makes epic movies look like soap operas, or noise reduction that can wash …',
        'url': 'http://techcrunch.com/2019/08/29/filmmaker-mode-will-automatically-turn-off-all-the-dumb-motion-smoothing-and-noise-reduction-on-new-tvs/',
        'urlToImage': 'https://techcrunch.com/wp-content/uploads/2019/08/filmmaker.png?w=758',
        'publishedAt': '2019-08-29T19:51:57Z',
        'content': 'Most people don’t adjust the settings on their TV after they buy it.\r\nMost newer TVs, meanwhile, come with a bunch of random junk turned on by default; things like motion smoothing that makes epic movies look like soap operas, or noise reduction that can wash… [+2279 chars]'
      }
    ]
  })
}

controller.prototype.user = function () {
  rxdata.response({ msg: 'From user' })
}

module.exports = controller
