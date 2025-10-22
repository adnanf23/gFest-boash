import H1 from '@/components/atom/heading';
import TextLabel from '@/components/atom/text-label';

export default function Hero() {
    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center p-6 lg:p-8">
                {/* <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header> */}
                <div className="text flex flex-col items-center justify-center gap-7 w-[80%] mt-[-180px] lg:w-[70%]">
                    <div className="label flex gap-5">
                        <TextLabel
                            textColor="yellow-300"
                            className="text-yellow-300"
                        >
                            gFest
                        </TextLabel>
                        <TextLabel className="text-[#808080]">
                            gGans Festival
                        </TextLabel>
                    </div>
                    <H1 align="center">
                        Kreatifitas Dan Inovasi Yang Tercipta Menjadi Festival
                        Yang Hebat
                    </H1>
                </div>
                <img
                    src="/hero.png"
                    alt="Hero Section"
                    width="75%"
                    className="absolute object-cover object-center bottom-0 lg:bottom-[-30px]"
                />
            </div>
            ;
        </>
    );
}
