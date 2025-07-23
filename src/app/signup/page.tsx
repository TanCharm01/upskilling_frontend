import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-gray-500 text-sm mt-2">Please provide your information to create an account.</p>
        </div>

        {/* Sign Up Form */}
        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="full-name" className="mb-1 block text-sm font-medium text-gray-700">
              Full name
            </label>
            <Input id="full-name" type="text" placeholder="John Doe" className="w-full" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input id="email" type="email" placeholder="name@company.com" className="w-full" />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input id="password" type="password" placeholder="********" className="w-full"/>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm text-gray-700">
              {"I agree to the "}
              <Link href="#" className="font-medium text-loginPurple-DEFAULT hover:underline">
                terms and conditions
              </Link>
              {" and the "}
              <Link href="#" className="font-medium text-loginPurple-DEFAULT hover:underline">
                privacy policy
              </Link>
            </label>
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            className="w-full bg-uncommonBlue text-white hover:bg-white py-2 rounded-md"
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  )
}
