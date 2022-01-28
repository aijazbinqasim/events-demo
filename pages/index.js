import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";

function Index() {
  const fEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={fEvents} />
    </div>
  );
}

export default Index;
