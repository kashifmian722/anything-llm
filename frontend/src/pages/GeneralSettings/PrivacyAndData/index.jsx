import { useEffect, useState } from "react";
import Sidebar from "@/components/SettingsSidebar";
import { isMobile } from "react-device-detect";
import showToast from "@/utils/toast";
import System from "@/models/system";
import PreLoader from "@/components/Preloader";
import {
  EMBEDDING_ENGINE_PRIVACY,
  LLM_SELECTION_PRIVACY,
  VECTOR_DB_PRIVACY,
} from "@/pages/OnboardingFlow/Steps/DataHandling";
import { useTranslation } from "react-i18next";

export default function PrivacyAndDataHandling() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      const settings = await System.keys();
      setSettings(settings);
      setLoading(false);
    }
    fetchSettings();
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-sidebar flex">
      <Sidebar />
      <div
        style={{ height: isMobile ? "100%" : "calc(100% - 32px)" }}
        className="relative md:ml-[2px] md:mr-[16px] md:my-[16px] md:rounded-[16px] bg-main-gradient w-full h-full overflow-y-scroll"
      >
        <div className="flex flex-col w-full px-1 md:pl-6 md:pr-[50px] md:py-6 py-16">
          <div className="w-full flex flex-col gap-y-1 pb-6 border-white border-b-2 border-opacity-10">
            <div className="items-center flex gap-x-4">
              <p className="text-lg leading-6 font-bold text-white">
                {t("privacy.title")}
              </p>
            </div>
            <p className="text-xs leading-[18px] font-base text-white text-opacity-60">
              {t("privacy.description")}
            </p>
          </div>
          {loading ? (
            <div className="h-1/2 transition-all duration-500 relative md:ml-[2px] md:mr-[8px] md:my-[16px] md:rounded-[26px] p-[18px] h-full overflow-y-scroll">
              <div className="w-full h-full flex justify-center items-center">
                <PreLoader />
              </div>
            </div>
          ) : (
            <>
              <ThirdParty settings={settings} />
              {/* <TelemetryLogs settings={settings} /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ThirdParty({ settings }) {
  const llmChoice = settings?.LLMProvider || "openai";
  const embeddingEngine = settings?.EmbeddingEngine || "openai";
  const vectorDb = settings?.VectorDB || "lancedb";
  const { t } = useTranslation();

  return (
    <div className="py-8 w-full flex items-start justify-center flex-col gap-y-6 border-b-2 border-white/10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-y-2 border-b border-zinc-500/50 pb-4">
          <div className="text-white text-base font-bold">
            {t("privacy.llm")}
          </div>
          <div className="flex items-center gap-2.5">
            <img
              src={LLM_SELECTION_PRIVACY[llmChoice].logo}
              alt="LLM Logo"
              className="w-8 h-8 rounded"
            />
            <p className="text-white text-sm font-bold">
              {LLM_SELECTION_PRIVACY[llmChoice].name}
            </p>
          </div>
          <ul className="flex flex-col list-disc ml-4">
            {LLM_SELECTION_PRIVACY[llmChoice].description.map((desc) => (
              <li className="text-white/90 text-sm">{desc}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-y-2 border-b border-zinc-500/50 pb-4">
          <div className="text-white text-base font-bold">
            {t("privacy.embedding")}
          </div>
          <div className="flex items-center gap-2.5">
            <img
              src={EMBEDDING_ENGINE_PRIVACY[embeddingEngine].logo}
              alt="LLM Logo"
              className="w-8 h-8 rounded"
            />
            <p className="text-white text-sm font-bold">
              {EMBEDDING_ENGINE_PRIVACY[embeddingEngine].name}
            </p>
          </div>
          <ul className="flex flex-col list-disc ml-4">
            {EMBEDDING_ENGINE_PRIVACY[embeddingEngine].description.map(
              (desc) => (
                <li className="text-white/90 text-sm">{desc}</li>
              )
            )}
          </ul>
        </div>

        <div className="flex flex-col gap-y-2 pb-4">
          <div className="text-white text-base font-bold">
            {t("privacy.vector")}
          </div>
          <div className="flex items-center gap-2.5">
            <img
              src={VECTOR_DB_PRIVACY[vectorDb].logo}
              alt="LLM Logo"
              className="w-8 h-8 rounded"
            />
            <p className="text-white text-sm font-bold">
              {VECTOR_DB_PRIVACY[vectorDb].name}
            </p>
          </div>
          <ul className="flex flex-col list-disc ml-4">
            {VECTOR_DB_PRIVACY[vectorDb].description.map((desc) => (
              <li className="text-white/90 text-sm">{desc}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
