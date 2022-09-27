import type { Provider } from "next-auth/providers";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import TextField from "../components/form/TextField";

type Props = {
  csrfToken: string;
  providers: Array<Provider>;
};

export default function SignIn({ csrfToken, providers }: Props) {
  return (
    <>
      <div className="full-screen page container mx-auto">
        <div className="paper-form">
          <form method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <h6 className="text-center">Login to Webstie</h6>
            <div className="py-6">
              <TextField
                id="username"
                name="username"
                type="text"
                label="Email Address"
              />
            </div>
            <div className="pb-6">
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
              />
            </div>
            <div className="py-6">
              <button className="btn btn-primary w-full" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="py-4">
            <hr />
          </div>
          {Object.values(providers).map((provider) => {
            if (provider.name === "Credentials") return;
            return (
              <div key={provider.name}>
                <button
                  className="btn btn-primary w-full"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            );
          })}
          <div className="pt-4 text-center">
            <a className="hover:text-primary-light">Forgot Password?</a>
            <br />
            <br />
            <a className={`hover:text-primary-light`}>
              Don&apos;t have an account?
              <br />
              Click here to register.
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken: csrfToken || null,
      providers,
    },
  };
}
