import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsBanner from "@/components/EventsBanner";
import { getActiveAnnouncement } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcement = await getActiveAnnouncement();

  return (
    <>
      <EventsBanner announcement={announcement} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
