import * as R from './main';

const eq = (actualValue: any, expectValue: any) => {
  expect(actualValue).toBe(expectValue);
};

const albums = [
  { title: 'A Farewell to Kings', artist: 'Rush', genre: 'Rock', score: 3 },
  { title: 'Timeout', artist: 'Dave Brubeck Quartet', genre: 'Jazz', score: 3 },
  { title: 'Fly By Night', artist: 'Rush', genre: 'Rock', score: 5 },
  {
    title: 'Goldberg Variations',
    artist: 'Daniel Barenboim',
    genre: 'Baroque',
    score: 3
  },
  {
    title: 'Art of the Fugue',
    artist: 'Glenn Gould',
    genre: 'Baroque',
    score: 3
  },
  {
    title: 'New World Symphony',
    artist: 'Leonard Bernstein',
    genre: 'Romantic',
    score: 4
  },
  {
    title: 'Romance with the Unseen',
    artist: 'Don Byron',
    genre: 'Jazz',
    score: 5
  },
  {
    title: 'Somewhere In Time',
    artist: 'Iron Maiden',
    genre: 'Metal',
    score: 2
  },
  {
    title: 'In Times of Desparation',
    artist: 'Danny Holt',
    genre: 'Modern',
    score: 1
  },
  { title: 'Evita', artist: 'Various', genre: 'Broadway', score: 3 },
  { title: 'Five Leaves Left', artist: 'Nick Drake', genre: 'Folk', score: 1 },
  {
    title: 'The Magic Flute',
    artist: 'John Eliot Gardiner',
    genre: 'Classical',
    score: 4
  }
];

describe('sortWith', function () {
  it('sorts by a simple property of the objects', function () {
    const sortedAlbums = R.sortWith([R.ascendBy('title')], albums);

    eq(sortedAlbums.length, albums.length);
    eq(sortedAlbums[0].title, 'A Farewell to Kings');
    eq(sortedAlbums[11].title, 'Timeout');
  });

  it('sorts by a simple property of the objects highorder way', function () {
    const sort = R.sortWith([R.ascendBy('title')]);
    const sortedAlbums = sort(albums);

    eq(sortedAlbums.length, albums.length);
    eq(sortedAlbums[0].title, 'A Farewell to Kings');
    eq(sortedAlbums[11].title, 'Timeout');
  });

  it('sorts by multiple properties of the objects', function () {
    const sortedAlbums = R.sortWith(
      [R.ascendBy('score'), R.ascendBy('title')],
      albums
    );
    eq(sortedAlbums.length, albums.length);
    eq(sortedAlbums[0].title, 'Five Leaves Left');
    eq(sortedAlbums[1].title, 'In Times of Desparation');
    eq(sortedAlbums[11].title, 'Romance with the Unseen');
  });

  it('sorts by 3 properties of the objects', function () {
    const sortedAlbums = R.sortWith(
      [
        R.ascend(R.prop('genre')),
        R.ascend(R.prop('score')),
        R.ascend(R.prop('title'))
      ],
      albums
    );
    eq(sortedAlbums.length, albums.length);
    eq(sortedAlbums[0].title, 'Art of the Fugue');
    eq(sortedAlbums[1].title, 'Goldberg Variations');
    eq(sortedAlbums[11].title, 'New World Symphony');
  });

  it('sorts by multiple properties using ascend and descend', function () {
    const sortedAlbums = R.sortWith(
      [R.descendBy('score'), R.ascend(R.prop('title'))],
      albums
    );
    eq(sortedAlbums.length, albums.length);
    eq(sortedAlbums[0].title, 'Fly By Night');
    eq(sortedAlbums[1].title, 'Romance with the Unseen');
    eq(sortedAlbums[11].title, 'In Times of Desparation');
  });

  it('preserves object identity', function () {
    const a = { value: 'a' };
    const b = { value: 'b' };
    const result = R.sortWith([R.ascend(R.prop('value'))], [b, a]);
    eq(result[0], a);
    eq(result[1], b);
  });

  it('sorts array-like object', function () {
    const args = (function (..._: string[]) {
      // eslint-disable-next-line prefer-rest-params
      return arguments;
    })('c', 'a', 'b');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const result = R.sortWith([R.ascend((i) => i)], args);
    eq(result[0], 'a');
    eq(result[1], 'b');
    eq(result[2], 'c');
  });
});
