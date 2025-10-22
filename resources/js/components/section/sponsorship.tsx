import TextBox from '../template/textbox';

export default function PartnershipSection() {
    return (
        <>
            <section
                id="partnership"
                className="flex min-h-screen items-center justify-center px-6 py-20"
            >
                <TextBox
                    h2=" Kerja sama dan sponsorship"
                    img="/kajian-akbar.png"
                    p="Kami terbuka untuk kerja sama dan sponsor untuk festival ini, jika anda berkenan untuk mengsponsori gFest yang di adakan oleh SD Global Garuda Nusantara Islamic Centre (gGans), Silahkan isi form."
                />
            </section>
        </>
    );
}
