import SignInForm from "@/components/form/signin-form";

interface SignInPageProps {
  searchParams?: { callbackUrl?: string };
}

const SignInPage = ({ searchParams }: SignInPageProps) => {
  // ✅ Vérification pour éviter les erreurs d'accès
  const callbackUrl = searchParams?.callbackUrl ? decodeURIComponent(searchParams.callbackUrl) : "/";

  return (
    <div className="w-full">
      <SignInForm callbackUrl={callbackUrl} />
    </div>
  );
};

export default SignInPage;
