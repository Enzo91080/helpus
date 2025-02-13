import { getDonations } from '@/lib/actions/donations.actions';
import ChatComponent from '@/components/chat/ChatComponent';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { nextauthOptions } from '@/lib/nextauth-options';

export default async function DonationChatPage({ 
  params 
}: { 
  params: { donationId: string } 
}) {
  const session = await getServerSession(nextauthOptions);
  const donations = await getDonations();
  const donation = donations.find((d: IDonation) => d._id.toString() === params.donationId);

  // Check access rights
  if (!session?.user?._id || 
      !donation ||
      (donation.donorId._id.toString() !== session.user._id &&
       donation.beneficiaryId._id.toString() !== session.user._id &&
       session.user.role !== 'admin')) {
    redirect('/');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Discussion {donation?.beneficiaryId.name} & {donation?.donorId.name}
      </h1>
      <ChatComponent 
        channelId={`donation-${donation._id}`}
        members={[
          donation.donorId._id.toString(),
          donation.beneficiaryId._id.toString()
        ]}
      />
    </div>
  );
} 