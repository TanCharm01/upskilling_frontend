"use client"
import Image from "next/image"
import Paragraph from "@/components/styled/paragraph" // 
import Link from "next/link"
import { FaFacebook, FaLinkedinIn } from "react-icons/fa"
import { IoLogoInstagram } from "react-icons/io5"
import { PiArrowUpRightBold } from "react-icons/pi"

type footerProps = {}

export default function Footer({}: footerProps) {
  return (
    <footer className="p-[5%] pt-0 xl:flex xl:px-[6%] gap-7 justify-between">
      <div className="flex flex-col  xl:w-[20%]">
        <Image
          height={50}
          width={150}
          className={"lg:w-[180px] h-auto mb-4"} // Corrected template literal usage
          src="/images/hd-logo.svg" // Corrected image path
          quality={100}
          alt="Uncommon Logo"
        />
        <Paragraph>
          uncommon.org is a 501(c)(3) <br className="hidden xl:block" /> non-profit organization.{" "}
        </Paragraph>
        <div className="flex gap-3 mt-3 mb-5">
          <Link href="https://www.linkedin.com/company/uncommon-org" target="_blank" className="text-xl">
            <FaLinkedinIn />
          </Link>
          <Link href="https://www.facebook.com/uncommon.org/" target="_blank" className="text-xl">
            <FaFacebook />
          </Link>
          <Link href="https://www.instagram.com/the_uncommonorg/" target="_blank" className="text-xl">
            <IoLogoInstagram />
          </Link>
          {/* <Link href="/" className="text-xl">            <SiTwoo />          </Link>  */}
        </div>
      </div>
      <div className="xl:w-[60%]">
        <div className="flex flex-wrap justify-between gap-4 mb-7">
          <div className="gap-2 flex w-[45%] flex-col mb-10 md:m-0 md:w-[47%] lg:w-[25%] xl:w-[18%]">
            <h5 className="font-secondary text-md w-max">for you</h5>
            <Link href="/donate">donate</Link>
            <Link href="/get-involved">get involved</Link>
            <Link href="/our-partners">partner with us</Link>
            <Link target="_blank" href="https://billing.stripe.com/p/login/cN23cI56J6tW7Uk8ww">
              manage donation
            </Link>
          </div>
          <div className="gap-2 flex w-[45%] flex-col mb-10 md:m-0 md:w-[47%] lg:w-[25%] xl:w-[18%]">
            <h5 className="font-secondary text-md w-max">our programs</h5>
            <Link href="/our-programs/bootcamp">bootcamp</Link>
            <Link href="/our-programs/youth-coding">youth coding</Link>
            <Link href="/our-programs/teacher-training">teacher training</Link>
          </div>
          <div className="gap-2 flex w-[45%] flex-col mb-10 md:m-0 md:w-[47%] lg:w-[25%] xl:w-[18%]">
            <h5 className="font-secondary text-md w-max">community</h5>
            <Link href="/contact">contact us </Link>
            <Link href="/our-communities">locations</Link>
            <Link href="/careers">careers</Link>
            <Link href="/meet-the-team">meet the team</Link>
          </div>
          <div className="gap-2 flex min-w-[150px] w-[45%] flex-col mb-10 md:m-0 md:w-[47%] lg:w-[25%] xl:w-[18%]">
            <h5 className="font-secondary text-md w-max">notes</h5>
            <Link href="/our-story">our story </Link>
            <Link href="/annual-reports">annual reports</Link>
            {/* <Link href="/blogs">blog</Link> */}
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            href="/contact"
            className="md:w-full md:py-0 md:h-[110px] xl:max-w-[427px] md:mt-auto bg-primary font-secondary text-2xl w-full max-w-[250px] mt-10 text-light py-7 px-10 rounded-[20px] md:rounded-[30px] relative flex justify-center items-center hover:text-light"
          >
            <PiArrowUpRightBold className="absolute top-3 right-3" />
            <span>get in touch</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
