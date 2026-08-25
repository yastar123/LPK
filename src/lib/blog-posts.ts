import blogAupair from "@/assets/blog-aupair.jpg";
import blogAusbildung from "@/assets/blog-ausbildung.jpg";
import blogFsj from "@/assets/blog-fsj.jpg";
import blogKarir from "@/assets/blog-karir.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  date: string;
  author: string;
  img: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "peluang-karir-kerja-di-jerman",
    title: "Peluang Karir Kerja di Jerman",
    tag: "Karier",
    excerpt:
      "Beragam peluang karier yang terbuka bagi lulusan program Ich Liebe Deutsch Medan setelah menyelesaikan studi di Jerman.",
    date: "16 Oktober 2023",
    author: "admin",
    img: blogKarir,
    content: [
      "Jerman dikenal sebagai salah satu negara dengan perekonomian terkuat di Eropa. Bagi pemuda-pemudi Indonesia yang telah menyelesaikan program Aupair, Ausbildung, maupun FSJ, banyak peluang karier yang terbuka untuk bekerja dan menetap di Jerman.",
      "Setelah menyelesaikan program, peserta dapat melanjutkan ke jenjang karier sesuai bidang yang ditekuni. Lulusan Ausbildung Gastronomie misalnya, dapat bekerja di hotel, restoran, ataupun industri kuliner yang terus berkembang di Jerman.",
      "Selain itu, lulusan FSJ Keperawatan memiliki kesempatan besar untuk melanjutkan pendidikan keperawatan dan bekerja di berbagai fasilitas kesehatan seperti rumah sakit dan panti jompo yang membutuhkan banyak tenaga perawat.",
      "Dengan pengalaman tinggal dan kemampuan bahasa Jerman yang baik, peserta program Ich Liebe Deutsch Medan memiliki modal kuat untuk membangun karier jangka panjang di Jerman.",
    ],
  },
  {
    slug: "program-ausbildung-jerman",
    title: "Program Ausbildung Jerman",
    tag: "Ausbildung",
    excerpt:
      "Sekolah sambil bekerja dengan gaji di Jerman lewat program Ausbildung Gastronomie bersama Ich Liebe Deutsch Medan.",
    date: "16 Oktober 2023",
    author: "admin",
    img: blogAusbildung,
    content: [
      "Program Ausbildung adalah sistem pendidikan dual (ganda) di Jerman di mana peserta belajar teori di sekolah sekaligus praktik langsung di perusahaan. Selama program berlangsung, peserta mendapatkan gaji bulanan dari perusahaan tempat mereka bekerja.",
      "Ich Liebe Deutsch Medan menyelenggarakan program Ausbildung bidang Gastronomie yang berfokus pada industri perhotelan dan kuliner. Program ini cocok bagi mereka yang ingin berkarier di bidang hospitality di Jerman.",
      "Selama 3 tahun program, peserta akan mempelajari keterampilan memasak, pelayanan, hingga manajemen dapur dan restoran. Setelah lulus, peserta mendapat sertifikat yang diakui di seluruh Jerman dan Eropa.",
      "Dengan sertifikat Ausbildung, lulusan memiliki peluang kerja yang luas dan dapat melanjutkan ke jenjang karier yang lebih tinggi di industri perhotelan maupun membuka usaha kuliner sendiri.",
    ],
  },
  {
    slug: "program-aupair-di-jerman",
    title: "Program Aupair di Jerman",
    tag: "Aupair",
    excerpt:
      "Pengalaman tinggal bersama Hostfamily di Jerman sambil belajar bahasa dan budaya lewat program Aupair.",
    date: "16 Oktober 2023",
    author: "admin",
    img: blogAupair,
    content: [
      "Program Aupair memberikan kesempatan bagi pemuda-pemudi Indonesia untuk tinggal bersama keluarga Jerman (Hostfamily) sambil merawat anak dan belajar bahasa serta budaya Jerman secara langsung.",
      "Selama program, Aupair akan tinggal di rumah Hostfamily, mendapatkan kamar pribadi, makan, dan uang saku bulanan. Sebagai imbalannya, Aupair membantu mengurus anak dan pekerjaan rumah tangga ringan.",
      "Ich Liebe Deutsch Medan mempersiapkan peserta mulai dari kursus bahasa Jerman level A1, persiapan dokumen, hingga penyaluran ke mitra Hostfamily yang tepercaya di Jerman.",
      "Program Aupair adalah langkah awal yang ideal untuk mengenal budaya Jerman dan meningkatkan kemampuan bahasa sebelum melanjutkan ke program Ausbildung atau FSJ.",
    ],
  },
  {
    slug: "program-fsj-di-jerman",
    title: "Program FSJ di Jerman",
    tag: "FSJ",
    excerpt:
      "Voluntary Social Year (FSJ) sebagai langkah awal membangun karier keperawatan di Jerman.",
    date: "16 Oktober 2023",
    author: "admin",
    img: blogFsj,
    content: [
      "FSJ (Freiwilliges Soziales Jahr) atau Tahun Sosial Sukarela adalah program di mana peserta bekerja sebagai relawan di fasilitas sosial seperti rumah sakit, panti jompo, atau pusat rehabilitasi selama satu tahun.",
      "Program FSJ Keperawatan Ich Liebe Deutsch Medan ditujukan bagi pemuda-pemudi yang ingin membangun karier di bidang keperawatan di Jerman. Selama program, peserta mendapatkan pengalaman kerja langsung dan tunjangan bulanan.",
      "FSJ menjadi pintu masuk yang baik untuk melanjutkan pendidikan keperawatan formal di Jerman. Banyak peserta FSJ melanjutkan ke sekolah keperawatan dan akhirnya bekerja sebagai perawat profesional di Jerman.",
      "Dengan kebutuhan tenaga perawat yang terus meningkat di Jerman, lulusan FSJ memiliki prospek karier yang sangat menjanjikan di sektor kesehatan.",
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
