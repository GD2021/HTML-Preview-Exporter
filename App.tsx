
import React, { useState, useRef, useCallback } from 'react';

// TypeScript declaration for the dom-to-image-more library loaded from CDN
declare var domtoimage: any;

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>5岁儿童健康评估报告</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome for professional icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* 导入Inter字体，并确保中文字体优先使用一个现代无衬线字体 */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        
        :root {
            /* 定义高亮色：纯青色 */
            --highlight-color: #00FFFF;
            --dark-background: #0A0A1F; /* 深空蓝背景 */
        }
        
        body {
            background-color: var(--dark-background);
            font-family: 'Inter', 'Noto Sans SC', 'Microsoft YaHei', sans-serif;
            color: #E0E0FF; /* 柔和的白色 */
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            padding: 2rem 0;
        }

        /* 限制内容区域在1200*1800内完整展示 */
        .container-limit {
            width: 100%;
            max-width: 1200px;
            /* min-height: 1800px;  This can cause excessive empty space, better to let content define height */
            background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
            border: 1px solid rgba(0, 255, 255, 0.1);
            border-radius: 20px;
            box-shadow: 0 0 50px rgba(0, 255, 255, 0.15);
            padding: 4rem;
            position: relative;
        }

        /* 超大视觉元素：标题背景渐变和阴影 */
        .ultra-title {
            font-size: 6rem; /* 标题超大字体 */
            font-weight: 900;
            line-height: 1;
            color: var(--highlight-color);
            text-shadow: 0 0 30px var(--highlight-color);
        }

        /* 核心数字的超大字体和科技感渐变 */
        .data-number {
            font-size: 8rem; /* 核心数字超大字体 */
            line-height: 1;
            font-weight: 800;
            /* 高亮色透明度渐变 */
            background: linear-gradient(90deg, var(--highlight-color) 0%, rgba(0, 255, 255, 0.4) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
            transition: transform 0.3s;
        }
        .data-number:hover {
            transform: scale(1.03);
        }

        /* 中文大号粗体 */
        .cn-large-bold {
            font-size: 1.8rem;
            font-weight: 700;
            line-height: 1.4;
            color: #FFFFFF;
        }

        /* 英文小号字体作为点缀 */
        .en-small-accent {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: rgba(0, 255, 255, 0.6);
            margin-bottom: 0.5rem;
        }

        /* 简洁的勾线风格图形/边框 */
        .outline-box {
            border: 2px solid rgba(0, 255, 255, 0.2);
            border-radius: 12px;
            transition: box-shadow 0.3s;
        }
        .outline-box:hover {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }

        /* 科技感高亮分割线 */
        .highlight-divider {
            height: 2px;
            width: 100%;
            background: linear-gradient(90deg, var(--highlight-color) 0%, rgba(0, 255, 255, 0.0) 100%);
            margin: 3rem 0;
        }
    </style>
</head>
<body>

<div class="container-limit">
    <!-- 1. 超大视觉元素 - 主标题 -->
    <header class="mb-16">
        <p class="en-small-accent">ASSESSMENT REPORT</p>
        <h1 class="ultra-title">
            健康数据档案
        </h1>
        <p class="text-xl text-gray-400 mt-4">5 岁儿童初步健康评估与生长潜力建议</p>
        <div class="highlight-divider mt-6"></div>
    </header>

    <!-- 2. 核心数据突出展示 (超大数字 + 中文大号粗体 + 英文点缀) -->
    <div class="grid grid-cols-3 gap-8 text-center mb-20">
        <!-- 年龄 -->
        <div class="outline-box p-8 bg-gray-900/40">
            <p class="en-small-accent">KEY METRIC / AGE</p>
            <div class="data-number">5</div>
            <p class="cn-large-bold mt-4">周岁</p>
        </div>
        <!-- 身高 -->
        <div class="outline-box p-8 bg-gray-900/40">
            <p class="en-small-accent">KEY METRIC / HEIGHT</p>
            <div class="data-number">106</div>
            <p class="cn-large-bold mt-4">厘米 (cm)</p>
        </div>
        <!-- 体重 -->
        <div class="outline-box p-8 bg-gray-900/40">
            <p class="en-small-accent">KEY METRIC / WEIGHT</p>
            <div class="data-number">17</div>
            <p class="cn-large-bold mt-4">公斤 (kg)</p>
        </div>
    </div>

    <!-- 3. 初步结论与解读 -->
    <section class="mb-16">
        <h2 class="cn-large-bold mb-4 border-l-4 border-cyan-500 pl-4">
            <i class="fas fa-microscope text-cyan-400 mr-3"></i>初步健康评估结果
        </h2>
        <div class="p-6 outline-box text-lg leading-relaxed bg-gray-900/40">
            <p class="text-xl text-cyan-300 font-semibold mb-3">结论：生长指标基本正常，潜力良好。</p>
            
            <p class="mb-3">
                <span class="font-bold text-white">身高 (106 cm)：</span> 处于同龄儿童的**正常中位数附近**（参考标准约 105.7 cm）。这表明她的生长速度和目前的身高水平是健康的，并不属于“矮小”范畴。
            </p>
            <p class="mb-3">
                <span class="font-bold text-white">体重 (17 kg)：</span> 与身高匹配，体重指数（BMI）预估在健康范围内，**无需担心营养不良或超重**的问题。
            </p>
            <p class="text-sm text-gray-400 mt-4">
                <span class="en-small-accent mr-2">CONTEXTUAL NOTE:</span>
                “班级里算矮”可能是由于班级内存在较多高于平均身高的个体，导致相对视觉差异，数据本身是健康的。
            </p>
        </div>
    </section>

    <!-- 4. 个性化建议与核心增长领域 (使用勾线图标和高亮) -->
    <div class="highlight-divider"></div>

    <section class="mb-16">
        <h2 class="cn-large-bold mb-8 border-l-4 border-cyan-500 pl-4">
            <i class="fas fa-chart-line text-cyan-400 mr-3"></i>最大化生长潜力：三大关键领域
        </h2>

        <div class="grid grid-cols-3 gap-6">
            
            <!-- 建议 1: 营养方面 -->
            <div class="outline-box p-6 bg-gray-900/40 relative overflow-hidden">
                <!-- 勾线风格图形/装饰 (使用高亮色透明度渐变) -->
                <div class="absolute top-0 right-0 h-24 w-24 rounded-bl-full opacity-10" style="background: var(--highlight-color);"></div>
                
                <p class="en-small-accent">DOMAIN I / NUTRITION</p>
                <div class="text-5xl text-cyan-400 mb-4"><i class="fas fa-utensils"></i></div>
                <h3 class="cn-large-bold mb-3">营养摄入巩固</h3>
                <p class="text-gray-300 text-lg">
                    继续执行**“增加主食多样性与趣味性”**的计划，确保能量摄入充足，这是稳定增长的基础。
                </p>
            </div>

            <!-- 建议 2: 睡眠方面 -->
            <div class="outline-box p-6 bg-gray-900/40 relative overflow-hidden">
                <div class="absolute top-0 right-0 h-24 w-24 rounded-bl-full opacity-10" style="background: var(--highlight-color);"></div>

                <p class="en-small-accent">DOMAIN II / SLEEP QUALITY</p>
                <div class="text-5xl text-cyan-400 mb-4"><i class="fas fa-bed"></i></div>
                <h3 class="cn-large-bold mb-3">优质睡眠保障</h3>
                <p class="text-gray-300 text-lg">
                    严格执行**晚上 9-10 点前入睡**，确保每日拥有至少 10 小时的优质睡眠时间，以分泌足量的生长激素。
                </p>
            </div>

            <!-- 建议 3: 运动方面 -->
            <div class="outline-box p-6 bg-gray-900/40 relative overflow-hidden">
                <div class="absolute top-0 right-0 h-24 w-24 rounded-bl-full opacity-10" style="background: var(--highlight-color);"></div>

                <p class="en-small-accent">DOMAIN III / PHYSICAL ACTIVITY</p>
                <div class="text-5xl text-cyan-400 mb-4"><i class="fas fa-running"></i></div>
                <h3 class="cn-large-bold mb-3">刺激骨骼运动</h3>
                <p class="text-gray-300 text-lg">
                    坚持每天的**户外弹跳性运动**（如跳绳、跳跃），通过科学刺激来最大化骨骼的生长潜力。
                </p>
            </div>
        </div>
    </section>

    <!-- 5. 最终提醒与专业建议 -->
    <section>
        <div class="highlight-divider"></div>
        <div class="p-6 rounded-xl border border-red-500/30 bg-red-900/20">
            <p class="en-small-accent text-red-400">NEXT STEP / PROFESSIONAL CONSULTATION</p>
            <p class="text-xl text-gray-200 leading-relaxed">
                <i class="fas fa-exclamation-triangle text-red-400 mr-3"></i>
                <span class="cn-large-bold text-red-300">温和提醒：</span>
                孩子的生长是一个持续的过程，目前数据健康，但如果顾虑仍存，<span class="text-white font-extrabold">最稳妥的方法</span>是咨询儿科内分泌科或儿保科，通过<span class="text-white font-extrabold">测量骨龄</span>，对她未来的身高潜力给出更科学、更准确的评估。
            </p>
        </div>
    </section>

</div>

</body>
</html>`;

const CodeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const Spinner: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


interface ControlsProps {
    fileName: string;
    setFileName: (name: string) => void;
    onExportPNG: () => void;
    onExportJPG: () => void;
    isExporting: boolean;
}

const Controls: React.FC<ControlsProps> = ({ fileName, setFileName, onExportPNG, onExportJPG, isExporting }) => (
    <div className="bg-gray-800 p-4 flex flex-wrap items-center justify-center gap-4 border-b border-gray-700">
        <div className="flex items-center">
            <label htmlFor="filename" className="text-sm font-medium text-gray-300 mr-2">File Name:</label>
            <input
                type="text"
                id="filename"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="html-preview"
                disabled={isExporting}
            />
        </div>
        <div className="flex items-center gap-4">
            <button
                onClick={onExportPNG}
                disabled={isExporting}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
                {isExporting ? <Spinner className="h-5 w-5" /> : <DownloadIcon className="h-5 w-5 mr-2" />}
                Export PNG
            </button>
            <button
                onClick={onExportJPG}
                disabled={isExporting}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400 disabled:cursor-not-allowed"
            >
                {isExporting ? <Spinner className="h-5 w-5" /> : <DownloadIcon className="h-5 w-5 mr-2" />}
                Export JPG
            </button>
        </div>
    </div>
);

interface EditorProps {
    code: string;
    setCode: (code: string) => void;
}
const Editor: React.FC<EditorProps> = ({ code, setCode }) => (
    <div className="h-full w-full flex flex-col">
        <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4 bg-gray-900 text-gray-300 font-mono text-sm border-r border-gray-700 focus:outline-none resize-none"
            spellCheck="false"
        />
    </div>
);

interface PreviewProps {
    code: string;
    iframeRef: React.RefObject<HTMLIFrameElement>;
}
const Preview: React.FC<PreviewProps> = ({ code, iframeRef }) => (
    <div className="h-full w-full bg-white">
        <iframe
            ref={iframeRef}
            srcDoc={code}
            title="HTML Preview"
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin"
        />
    </div>
);


const App: React.FC = () => {
    const [htmlCode, setHtmlCode] = useState<string>(DEFAULT_HTML);
    const [fileName, setFileName] = useState<string>('health-report');
    const [isExporting, setIsExporting] = useState<boolean>(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleExport = useCallback(async (format: 'png' | 'jpeg') => {
        const iframe = iframeRef.current;
        if (!iframe?.contentWindow?.document.documentElement) {
            alert('Preview content is not available for export.');
            return;
        }

        setIsExporting(true);
        try {
            // Wait for fonts to be loaded in the iframe to ensure correct rendering
            await iframe.contentWindow.document.fonts.ready;
            
            const element = iframe.contentWindow.document.documentElement;

            const options = {
                quality: 0.95,
                width: element.scrollWidth,
                height: element.scrollHeight,
                // This helps with external resources like images from picsum.photos
                fetchRequestInit: {
                    mode: 'cors' as RequestMode,
                    credentials: 'omit' as RequestCredentials,
                }
            };
            
            let dataUrl: string;
            if (format === 'png') {
                dataUrl = await domtoimage.toPng(element, options);
            } else {
                dataUrl = await domtoimage.toJpeg(element, options);
            }

            const link = document.createElement('a');
            link.download = `${fileName || 'html-preview'}.${format}`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Oops, something went wrong!', error);
            alert('Failed to export image. Check console for details.');
        } finally {
            setIsExporting(false);
        }
    }, [fileName]);

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white antialiased">
            <header className="bg-gray-800 border-b border-gray-700 shadow-md">
                <div className="container mx-auto px-4 py-3 flex items-center">
                    <CodeIcon className="h-8 w-8 text-blue-400" />
                    <h1 className="text-xl font-bold ml-3">HTML Preview & Exporter</h1>
                </div>
            </header>
            
            <Controls
                fileName={fileName}
                setFileName={setFileName}
                onExportPNG={() => handleExport('png')}
                onExportJPG={() => handleExport('jpeg')}
                isExporting={isExporting}
            />

            <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-1/2 h-1/2 md:h-full">
                    <Editor code={htmlCode} setCode={setHtmlCode} />
                </div>
                <div className="w-full md:w-1/2 h-1/2 md:h-full border-t-4 md:border-t-0 md:border-l-4 border-gray-700">
                    <Preview code={htmlCode} iframeRef={iframeRef} />
                </div>
            </main>
        </div>
    );
};

export default App;
