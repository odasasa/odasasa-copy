import {
  AuthNav,
  CreateStoreSection,
  FAQSection,
  FlexibleSection,
  HeroSection,
  LinkBioSection,
  LinkWhatsappSection,
  ManageOrdersSection,
  OurPartnersSection,
  PricingSection,
  SaveTimeSection,
  SecondaryCTASection,
  SectionTemplate,
  VendorHeader,
} from "@/components";

export default function Home() {
  return (
    <div className="w-full flex flex-col  ">
      <VendorHeader logoImageSrc={"/assets/logo-default.png"}>
        <AuthNav />
      </VendorHeader>

      <main className="w-full mt-24 px-10 md:px-24 flex flex-col justify-center items-center">
        {/* hero */}
        <HeroSection />

        {/*savetime  */}
        {/* <SaveTimeSection /> */}

        {/* Flexible */}
        {/* <FlexibleSection /> */}

        {/* ManageOrders */}
        {/* <ManageOrdersSection /> */}
        {/* <SectionTemplate
          heading="Manage orders efficiently"
          subHeading="No more spreadsheets or missed orders. Track your order status, payment status, daily sales and customer data all in one place."
          imgSrc="/vendors/vendor/manage_order.webp"
        /> */}

        {/* CreateStore */}
        {/* <CreateStoreSection /> */}
        {/* <SectionTemplate
          heading="Create online store in minutes"
          subHeading="Beautiful product catalog. Built-in search engine optimisations."
          imgSrc="/vendors/vendor/create_store.webp"
          rowReverse = {true}
        /> */}

        {/* LinkBio */}
        {/* <LinkBioSection /> */}
        {/* <SectionTemplate
          heading="Link In Bio"
          subHeading="Turn your followers to sales."
          imgSrc="/vendors/vendor/link_bio.webp"
          // rowReverse = {true}
        /> */}

        {/* LinkWhatsapp */}
        {/* <LinkWhatsappSection />
        <SectionTemplate
          heading="Link in WhatsApp Auto Reply"
          subHeading="Minimise customer waiting time."
          imgSrc="/vendors/vendor/link_to_whatsapp.webp"
          // rowReverse = {true}
        /> */}
        {/* Support
        <SupportSection /> */}

        {/* OurPartners */}
        {/* <OurPartnersSection /> */}

        {/* Pricing */}
        {/* <PricingSection /> */}

        {/* FAQ */}
        <FAQSection />

        {/* SecondaryCTA */}
        {/* <SecondaryCTASection /> */}
      </main>
    </div>
  );
}
