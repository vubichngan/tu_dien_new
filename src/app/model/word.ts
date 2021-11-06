import { DeclarationListEmitMode } from "@angular/compiler";

export class Word {
    _id?:String;
    tu_en: String;
    tu_loai:String;
    phien_am:String;
    nghia_en:String;
    nghia_vi:String;
    anh:String;
    tu_lienquan:[{
        tu_en: String,
      }];
    nguoi_tao:String;
    trang_thai:String;// đã duyệt, chưa duyệt, duyệt lại, từ chối.
    nguoi_duyet:String;
    isChecked:boolean;
    ghi_chu: String;
}
