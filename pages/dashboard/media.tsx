import { useState } from "react";
import ChatContainer from "src/components/ChatContainer";
import ContactContainer from "src/components/ContactContainer";
import ParentContainer from "src/components/ParentContainer";
import { contacts } from "src/utils/chats";

const Media = () => {
  const [details, setDetails] = useState<any>(contacts[0]);
  // patiente arrangements
  return (
    <ParentContainer>
      <div className="flex w-full h-full gap-6">
        <ContactContainer contacts={contacts} setDetails={setDetails} />
        <ChatContainer
          contactImage={details?.contactImage}
          contactName={details?.contactName}
          status={details?.activeStatus}
          message={details?.message}
        />
      </div>
    </ParentContainer>
  );
};
export default Media;
