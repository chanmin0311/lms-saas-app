import Image from "next/image";
import Link from "next/link";
import CTAImage from "@/public/images/cta.svg";
import plucIcon from "@/public/icons/plus.svg";

const CTA = () => {
    return (
        <section className="cta-section">
            <div className="cta-badge">Start learning your way.</div>
            <h2 className="text-3xl font-bold">
                Build and Personalize Learning Companion
            </h2>
            <p className="text-lg">
                Pick a name, subject, voice & personality - and start learning
                through voice conversations that feel natural and fun.
            </p>
            <Image src={CTAImage} alt="cta" width={362} height={232} />
            <button className="btn-primary">
                <Image src={plucIcon} alt="plus" width={12} height={12} />
                <Link href="/companions/new">
                    <p>Build a New Companion</p>
                </Link>
            </button>
        </section>
    );
};

export default CTA;
