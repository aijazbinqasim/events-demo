import Head from "next/head";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

export default function Index(props) {
  const router = useRouter();
  const { events } = props;

  function onGetFiltersHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <Head>
        <title>Events | All</title>
        <meta
          name="description"
          content="View all events for your next visit."
        />
      </Head>

      <EventsSearch onGetFiltersHandler={onGetFiltersHandler} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
