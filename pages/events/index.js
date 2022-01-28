import { useRouter } from "next/router";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function Index() {
  const router = useRouter();
  const events = getAllEvents();

  function onGetFiltersHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <EventsSearch onGetFiltersHandler={onGetFiltersHandler} />
      <EventList items={events} />
    </>
  );
}

export default Index;
