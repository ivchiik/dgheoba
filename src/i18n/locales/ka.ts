import type { en } from "./en";

export const ka: typeof en = {
  errors: {
    notFound: "ასეთი გვერდი არ არსებობს.",
  },
  tabs: {
    upload: "ატვირთვა",
    album: "ალბომი",
  },
  upload: {
    eventLabel: "ღონისძიება",
    addMedia: "დაამატე ფოტო ან ვიდეო",
    addMediaHint: "კამერა ან გალერეა",
    uploadedCount: "ატვირთული ფოტო",
    viewAlbum: "ალბომში ნახვა",
  },
  album: {
    title: "ალბომი",
    total: "სულ {{value}}",
    mine: "ჩემი {{value}}",
    empty: "ჯერ არაფერია ატვირთული.",
  },
  entry: {
    scanWithCamera: "კამერით დასკანერება",
    or: "ან",
    codePlaceholder: "კოდი",
    hint: "დაასკანერე მაგიდაზე მოთავსებული QR კოდი",
    yourName: "შენი სახელი",
    namePlaceholder: "სახელი და გვარი",
    submit: "ალბომში შესვლა",
  },
  scan: {
    title: "დაასკანერე QR კოდი",
    pickFromGallery: "ფოტოს ატვირთვა",
    permissionBody: "QR კოდის დასასკანერებლად გვჭირდება კამერაზე წვდომა.",
    grantPermission: "კამერაზე წვდომის ნება",
    openSettings: "პარამეტრების გახსნა",
    noQrFound: "ამ სურათზე QR კოდი ვერ ვიპოვეთ. სცადე ახლიდან.",
  },
  media: {
    download: "ჩამოტვირთვა",
    delete: "წაშლა",
    uploadedBy: "ატვირთა {{name}}",
    missing: "ეს ფაილი ალბომში აღარ არის.",
  },
  settings: {
    language: "ენა",
  },
  notFound: {
    goHome: "დასაწყისში დაბრუნება",
  },
};
