import Head from 'next/head';

const people = [
  {
    name: "Martin Eduardo Facundo Alvarez",
    studentId: "A00827653",
    role: "Front-end Developer",
    imageUrl:
      "/IMG_0722.JPG"
  }
];

export default function Page() {
  return (
    <>
      <Head>
        <title>Sentiflix | About</title>
        <meta name="description" content="Description of my Next.js page" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#000000"/>
      </Head>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our team
            </h2>
            <p className="mt-6 text-lg leading-8 text-white ">
              We’re a dynamic group of individuals who are passionate about what
              we do and dedicated to delivering the best results for our clients.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {people.map((person) => (
              <li key={person.name}>
                <img
                  className="aspect-[16/16] w-full rounded-2xl object-cover"
                  src={person.imageUrl}
                  alt="Profile photo"
                />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white ">
                  {person.name}
                </h3>
                <p className="text-base leading-7 text-white ">{person.studentId}</p>
                <p className="text-base leading-7 text-white ">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
