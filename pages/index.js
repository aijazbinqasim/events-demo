import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

export default function Index(props) {
  return (
    <div>
      <Head>
        <title>Events | Featured</title>
        <meta
          name="description"
          content="View featured events for your next visit."
        />
      </Head>

      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { events: featuredEvents },
    revalidate: 1800,
  };
}
