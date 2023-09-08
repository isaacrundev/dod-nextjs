import Image from "next/image";
import trainingManPic from "@/public/img/Fitz-Standing.png";
import handsPhonePic from "@/public/img/Hands-Phone.png";
import lifeManagementPic from "@/public/img/Life-Management.png";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl gap-16 mx-auto">
      <div className="flex flex-col items-center justify-center gap-20 md:flex-row-reverse">
        <div className="relative w-64">
          <Image alt="Hands-Phone" src={handsPhonePic} placeholder="blur" />
        </div>
        <div className="w-2/3">
          <p>
            Diet or Die, your ultimate destination for nutritional information
            and diet tracking! Whether you&apos;re looking to make informed
            choices about your meals or maintain a healthy lifestyle, we&apos;ve
            got you covered.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-20 md:flex-row">
        <div className="relative w-64">
          <Image alt="Fitz-Standing" src={trainingManPic} placeholder="blur" />
        </div>
        <div className="w-2/3">
          <p>
            With our comprehensive nutritional facts database, you can easily
            search for the essential information you need about various foods
            and beverages. From macronutrient breakdowns to vitamin and mineral
            content, we strive to provide you with accurate and up-to-date data
            to support your dietary decisions.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-20 md:flex-row-reverse">
        <div className="relative w-64">
          <Image
            alt="Life-Management"
            src={lifeManagementPic}
            placeholder="blur"
          />
        </div>
        <div className="w-2/3">
          <p>
            You can conveniently record your daily intake, allowing you to track
            your diet effortlessly. With this valuable tool, you can monitor
            your progress, identify patterns, and make adjustments to achieve
            your wellness goals. Start your nutritional adventure today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

// But that&apos;s not all! Our website goes beyond
//         tracking your meals. We understand that every individual has unique
//         energy requirements, which is why we offer a TDEE (Total Daily Energy
//         Expenditure) calculator. By inputting relevant information such as your
//         activity level, age, height, and weight, you can determine the ideal
//         calorie intake tailored to your specific needs. This knowledge empowers
//         you to maintain a healthy balance and optimize your overall well-being.
//         Join our community of health-conscious individuals who are committed to
//         embracing a nutritious lifestyle. Explore our website, unlock the
//         benefits of tracking your diet, and embark on a journey towards a
//         healthier, happier you.
