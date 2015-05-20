/**
 * Created by andrewmccormack on 06/05/2015.
 */

'use strict';
var assert = require('assert'),
    path = require('path'),
    _ = require('lodash'),
    grunt = require('grunt');

suite('locale-validator', function(){

    var helper = require(path.join(process.cwd(), 'tasks/lib/locale-helper.js'))("en-gb");

    suite('getLocale', function(){

        test('can get the locale when the file name is just the locale', function () {
            assert.equal(helper.getLocale("en-gb.js"),"en-gb");
            assert.equal(helper.getLocale("ar-YE.html"), "ar-ye");
        });

        test('can not get the locale when the file is fully qualified', function () {
            assert.equal(helper.getLocale("test/data/default/resources/en-gb.js"), "en-gb");
        });

        test('returns the default locale when the locale cannot be ascertained', function () {
            assert.equal(helper.getLocale("index.js"), "en-gb");
            assert.equal(helper.getLocale("resource.resx"), "en-gb");
        });


        test('can get the locale when the file name fits the expected format', function () {
            assert.equal(helper.getLocale("recent-searches.de-de.js"),"de-de");
            assert.equal(helper.getLocale("template.ar-YE.html"), "ar-ye");
        });
    });

    suite('isValid', function() {

        function assertAllLocalesAreValidated(locales) {
            _.forEach(locales, function (locale) {
                assert(helper.isValidLocale(locale), locale + ' is not validated');
            });
        }

        test('can validate .net formated locales', function () {
            assertAllLocalesAreValidated([
                'af-ZA', 'am-ET', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'arn-CL', 'ar-OM',
                'ar-QA', 'ar-SA', 'ar-SY', 'ar-TN', 'ar-YE', 'as-IN', 'az-Cyrl-AZ', 'az-Latn-AZ', 'ba-RU', 'be-BY', 'bg-BG', 'bn-BD', 'bn-IN',
                'bo-CN', 'br-FR', 'bs-Cyrl-BA', 'bs-Latn-BA', 'ca-ES', 'co-FR', 'cs-CZ', 'cy-GB', 'da-DK', 'de-AT', 'de-CH', 'de-DE', 'de-LI',
                'de-LU', 'dsb-DE', 'dv-MV', 'el-GR', 'en-029', 'en-AU', 'en-BZ', 'en-CA', 'en-GB', 'en-IE', 'en-IN', 'en-JM', 'en-MY', 'en-NZ',
                'en-PH', 'en-SG', 'en-TT', 'en-US', 'en-ZA', 'en-ZW', 'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-DO', 'es-EC', 'es-ES',
                'es-GT', 'es-HN', 'es-MX', 'es-NI', 'es-PA', 'es-PE', 'es-PR', 'es-PY', 'es-SV', 'es-US', 'es-UY', 'es-VE', 'et-EE', 'eu-ES',
                'fa-IR', 'fi-FI', 'fil-PH', 'fo-FO', 'fr-BE', 'fr-CA', 'fr-CH', 'fr-FR', 'fr-LU', 'fr-MC', 'fy-NL', 'ga-IE', 'gd-GB', 'gl-ES',
                'gsw-FR', 'gu-IN', 'ha-Latn-NG', 'he-IL', 'hi-IN', 'hr-BA', 'hr-HR', 'hsb-DE', 'hu-HU', 'hy-AM', 'id-ID', 'ig-NG', 'ii-CN',
                'is-IS', 'it-CH', 'it-IT', 'iu-Cans-CA', 'iu-Latn-CA', 'ja-JP', 'ka-GE', 'kk-KZ', 'kl-GL', 'km-KH', 'kn-IN', 'kok-IN', 'ko-KR',
                'ky-KG', 'lb-LU', 'lo-LA', 'lt-LT', 'lv-LV', 'mi-NZ', 'mk-MK', 'ml-IN', 'mn-MN', 'mn-Mong-CN', 'moh-CA', 'mr-IN', 'ms-BN',
                'ms-MY', 'mt-MT', 'nb-NO', 'ne-NP', 'nl-BE', 'nl-NL', 'nn-NO', 'nso-ZA', 'oc-FR', 'or-IN', 'pa-IN', 'pl-PL', 'prs-AF', 'ps-AF',
                'pt-BR', 'pt-PT', 'qut-GT', 'quz-BO', 'quz-EC', 'quz-PE', 'rm-CH', 'ro-RO', 'ru-RU', 'rw-RW', 'sah-RU', 'sa-IN', 'se-FI',
                'se-NO', 'se-SE', 'si-LK', 'sk-SK', 'sl-SI', 'sma-NO', 'sma-SE', 'smj-NO', 'smj-SE', 'smn-FI', 'sms-FI', 'sq-AL', 'sr-Cyrl-BA',
                'sr-Cyrl-CS', 'sr-Cyrl-ME', 'sr-Cyrl-RS', 'sr-Latn-BA', 'sr-Latn-CS', 'sr-Latn-ME', 'sr-Latn-RS', 'sv-FI', 'sv-SE', 'sw-KE',
                'syr-SY', 'ta-IN', 'te-IN', 'tg-Cyrl-TJ', 'th-TH', 'tk-TM', 'tn-ZA', 'tr-TR', 'tt-RU', 'tzm-Latn-DZ', 'ug-CN', 'uk-UA', 'ur-PK',
                'uz-Cyrl-UZ', 'uz-Latn-UZ', 'vi-VN', 'wo-SN', 'xh-ZA', 'yo-NG', 'zh-CN', 'zh-HK', 'zh-MO', 'zh-SG', 'zh-TW', 'zu-ZA',
            ]);
        });

        test('can validate unix formated locales', function () {
            assertAllLocalesAreValidated([
                'af_ZA', 'am_ET', 'ar_AE', 'ar_BH', 'ar_DZ', 'ar_EG', 'ar_IQ', 'ar_JO', 'ar_KW', 'ar_LB', 'ar_LY', 'ar_MA', 'arn_CL', 'ar_OM',
                'ar_QA', 'ar_SA', 'ar_SY', 'ar_TN', 'ar_YE', 'as_IN', 'az_Cyrl_AZ', 'az_Latn_AZ', 'ba_RU', 'be_BY', 'bg_BG', 'bn_BD', 'bn_IN',
                'bo_CN', 'br_FR', 'bs_Cyrl_BA', 'bs_Latn_BA', 'ca_ES', 'co_FR', 'cs_CZ', 'cy_GB', 'da_DK', 'de_AT', 'de_CH', 'de_DE', 'de_LI',
                'de_LU', 'dsb_DE', 'dv_MV', 'el_GR', 'en_029', 'en_AU', 'en_BZ', 'en_CA', 'en_GB', 'en_IE', 'en_IN', 'en_JM', 'en_MY', 'en_NZ',
                'en_PH', 'en_SG', 'en_TT', 'en_US', 'en_ZA', 'en_ZW', 'es_AR', 'es_BO', 'es_CL', 'es_CO', 'es_CR', 'es_DO', 'es_EC', 'es_ES',
                'es_GT', 'es_HN', 'es_MX', 'es_NI', 'es_PA', 'es_PE', 'es_PR', 'es_PY', 'es_SV', 'es_US', 'es_UY', 'es_VE', 'et_EE', 'eu_ES',
                'fa_IR', 'fi_FI', 'fil_PH', 'fo_FO', 'fr_BE', 'fr_CA', 'fr_CH', 'fr_FR', 'fr_LU', 'fr_MC', 'fy_NL', 'ga_IE', 'gd_GB', 'gl_ES',
                'gsw_FR', 'gu_IN', 'ha_Latn_NG', 'he_IL', 'hi_IN', 'hr_BA', 'hr_HR', 'hsb_DE', 'hu_HU', 'hy_AM', 'id_ID', 'ig_NG', 'ii_CN',
                'is_IS', 'it_CH', 'it_IT', 'iu_Cans_CA', 'iu_Latn_CA', 'ja_JP', 'ka_GE', 'kk_KZ', 'kl_GL', 'km_KH', 'kn_IN', 'kok_IN', 'ko_KR',
                'ky_KG', 'lb_LU', 'lo_LA', 'lt_LT', 'lv_LV', 'mi_NZ', 'mk_MK', 'ml_IN', 'mn_MN', 'mn_Mong_CN', 'moh_CA', 'mr_IN', 'ms_BN',
                'ms_MY', 'mt_MT', 'nb_NO', 'ne_NP', 'nl_BE', 'nl_NL', 'nn_NO', 'nso_ZA', 'oc_FR', 'or_IN', 'pa_IN', 'pl_PL', 'prs_AF', 'ps_AF',
                'pt_BR', 'pt_PT', 'qut_GT', 'quz_BO', 'quz_EC', 'quz_PE', 'rm_CH', 'ro_RO', 'ru_RU', 'rw_RW', 'sah_RU', 'sa_IN', 'se_FI',
                'se_NO', 'se_SE', 'si_LK', 'sk_SK', 'sl_SI', 'sma_NO', 'sma_SE', 'smj_NO', 'smj_SE', 'smn_FI', 'sms_FI', 'sq_AL', 'sr_Cyrl_BA',
                'sr_Cyrl_CS', 'sr_Cyrl_ME', 'sr_Cyrl_RS', 'sr_Latn_BA', 'sr_Latn_CS', 'sr_Latn_ME', 'sr_Latn_RS', 'sv_FI', 'sv_SE', 'sw_KE',
                'syr_SY', 'ta_IN', 'te_IN', 'tg_Cyrl_TJ', 'th_TH', 'tk_TM', 'tn_ZA', 'tr_TR', 'tt_RU', 'tzm_Latn_DZ', 'ug_CN', 'uk_UA', 'ur_PK',
                'uz_Cyrl_UZ', 'uz_Latn_UZ', 'vi_VN', 'wo_SN', 'xh_ZA', 'yo_NG', 'zh_CN', 'zh_HK', 'zh_MO', 'zh_SG', 'zh_TW', 'zu_ZA',
            ]);
        });

        test('can validate lower case locales', function () {
            assertAllLocalesAreValidated([
                'af-za', 'am-et', 'ar-ae', 'ar-bh', 'ar-dz', 'ar-eg', 'ar-iq', 'ar-jo', 'ar-kw', 'ar-lb', 'ar-ly', 'ar-ma', 'arn-cl', 'ar-om',
                'ar-qa', 'ar-sa', 'ar-sy', 'ar-tn', 'ar-ye', 'as-in', 'az-cyrl-az', 'az-latn-az', 'ba-ru', 'be-by', 'bg-bg', 'bn-bd', 'bn-in',
                'bo-cn', 'br-fr', 'bs-cyrl-ba', 'bs-latn-ba', 'ca-es', 'co-fr', 'cs-cz', 'cy-gb', 'da-dk', 'de-at', 'de-ch', 'de-de', 'de-li',
                'de-lu', 'dsb-de', 'dv-mv', 'el-gr', 'en-029', 'en-au', 'en-bz', 'en-ca', 'en-gb', 'en-ie', 'en-in', 'en-jm', 'en-my', 'en-nz',
                'en-ph', 'en-sg', 'en-tt', 'en-us', 'en-za', 'en-zw', 'es-ar', 'es-bo', 'es-cl', 'es-co', 'es-cr', 'es-do', 'es-ec', 'es-es',
                'es-gt', 'es-hn', 'es-mx', 'es-ni', 'es-pa', 'es-pe', 'es-pr', 'es-py', 'es-sv', 'es-us', 'es-uy', 'es-ve', 'et-ee', 'eu-es',
                'fa-ir', 'fi-fi', 'fil-ph', 'fo-fo', 'fr-be', 'fr-ca', 'fr-ch', 'fr-fr', 'fr-lu', 'fr-mc', 'fy-nl', 'ga-ie', 'gd-gb', 'gl-es',
                'gsw-fr', 'gu-in', 'ha-latn-ng', 'he-il', 'hi-in', 'hr-ba', 'hr-hr', 'hsb-de', 'hu-hu', 'hy-am', 'id-id', 'ig-ng', 'ii-cn',
                'is-is', 'it-ch', 'it-it', 'iu-cans-ca', 'iu-latn-ca', 'ja-jp', 'ka-ge', 'kk-kz', 'kl-gl', 'km-kh', 'kn-in', 'kok-in', 'ko-kr',
                'ky-kg', 'lb-lu', 'lo-la', 'lt-lt', 'lv-lv', 'mi-nz', 'mk-mk', 'ml-in', 'mn-mn', 'mn-mong-cn', 'moh-ca', 'mr-in', 'ms-bn',
                'ms-my', 'mt-mt', 'nb-no', 'ne-np', 'nl-be', 'nl-nl', 'nn-no', 'nso-za', 'oc-fr', 'or-in', 'pa-in', 'pl-pl', 'prs-af', 'ps-af',
                'pt-br', 'pt-pt', 'qut-gt', 'quz-bo', 'quz-ec', 'quz-pe', 'rm-ch', 'ro-ro', 'ru-ru', 'rw-rw', 'sah-ru', 'sa-in', 'se-fi',
                'se-no', 'se-se', 'si-lk', 'sk-sk', 'sl-si', 'sma-no', 'sma-se', 'smj-no', 'smj-se', 'smn-fi', 'sms-fi', 'sq-al', 'sr-cyrl-ba',
                'sr-cyrl-cs', 'sr-cyrl-me', 'sr-cyrl-rs', 'sr-latn-ba', 'sr-latn-cs', 'sr-latn-me', 'sr-latn-rs', 'sv-fi', 'sv-se', 'sw-ke',
                'syr-sy', 'ta-in', 'te-in', 'tg-cyrl-tj', 'th-th', 'tk-tm', 'tn-za', 'tr-tr', 'tt-ru', 'tzm-latn-dz', 'ug-cn', 'uk-ua', 'ur-pk',
                'uz-cyrl-uz', 'uz-latn-uz', 'vi-vn', 'wo-sn', 'xh-za', 'yo-ng', 'zh-cn', 'zh-hk', 'zh-mo', 'zh-sg', 'zh-tw', 'zu-za'
            ]);
        });
    });


});
