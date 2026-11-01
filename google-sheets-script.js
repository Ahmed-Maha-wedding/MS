/**
 * ==============================================================================
 * AHMED & MAHA WEDDING — GOOGLE SHEETS RSVP APPS SCRIPT
 * ==============================================================================
 * 
 * خطوات التفعيل في دقيقة واحدة (How to set up in 1 minute):
 * 
 * 1. افتح جوجل درايف وأنشئ ملف Google Sheets جديد وسمّه: "Ahmed & Maha - Wedding RSVP".
 * 2. من القائمة العلوية اضغط على: Extensions (الإضافات) -> Apps Script.
 * 3. امسح أي كود موجود هناك، والصق هذا الكود بالكامل مكانه.
 * 4. اضغط على أيقونة الحفظ (Save 💾).
 * 5. اضغط على الزر الأزرق في الأعلى: Deploy (نشر) -> New deployment (نشر جديد).
 * 6. اختر نوع النشر: Web App (تطبيق ويب).
 * 7. في إعدادات النشر:
 *    - Description: RSVP Webhook
 *    - Execute as: Me (حسابك)
 *    - Who has access: Anyone (أي شخص - حتى يتمكن الضيوف من إرسال الردود بدون تسجيل دخول).
 * 8. اضغط Deploy وانسخ الرابط الناتج (Web App URL) والصقه في ملف script.js في المتغير:
 *    const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/..../exec";
 * 
 * مبروك! أي ضيف يرسل رده سيظهر في ملف الإكسيل لحظياً ومباشرةً!
 * ==============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    // إنشاء صف العناوين تلقائياً إذا كان الملف فارغاً
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "التاريخ والوقت (Timestamp)",
        "اسم الضيف (Guest Name)",
        "حالة الحضور (Attendance)",
        "رسالة التهنئة (Congratulations Message)"
      ]);

      // تنسيق احترافي لصف العناوين
      var headerRange = sheet.getRange(1, 1, 1, 4);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0C1733");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // قراءة البيانات المرسلة سواء كانت JSON أو Form-Data
    var rawData = {};
    if (e.postData && e.postData.contents) {
      try {
        rawData = JSON.parse(e.postData.contents);
      } catch (err) {
        rawData = e.parameter || {};
      }
    } else if (e.parameter) {
      rawData = e.parameter;
    }

    var timestamp = Utilities.formatDate(new Date(), "Africa/Cairo", "yyyy-MM-dd HH:mm:ss");
    var guestName = rawData.name || rawData.guestName || "ضيف كريم";
    var attendance = (rawData.attendance === "yes" || rawData.attendance === "YES" || rawData.attendance === "Yes") ? "نعم، سأحضر (YES) ♥" : "اعتذار (NO)";
    var congratulations = rawData.message || rawData.congratulations || "-";

    // إضافة صف جديد بالبيانات
    sheet.appendRow([timestamp, guestName, attendance, congratulations]);

    // محاذاة البيانات في المنتصف تلقائياً
    var newRow = sheet.getLastRow();
    sheet.getRange(newRow, 1, 1, 4).setHorizontalAlignment("center");

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", row: newRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// دالة تجريبية للتأكد من عمل الرابط
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "active", message: "Ahmed & Maha RSVP Webhook is ready!" }))
    .setMimeType(ContentService.MimeType.JSON);
}
