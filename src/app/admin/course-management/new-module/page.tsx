"use client"

import { useState, useEffect } from "react"
// import { AppSidebar } from "@/components/app-sidebar"
import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft, ArrowRight, X } from "lucide-react" // Import X icon for module delete
import Link from "next/link"
import { LessonBlock } from "@/components/lesson-block"
import { CardHeader, CardTitle } from "@/components/ui/card" // Import CardHeader and CardTitle
import { useRouter } from 'next/navigation';
import NotificationModal from '@/components/ui/NotificationModal';

export default function UploadCourseContent() {
  const router = useRouter();
  const [modules, setModules] = useState([{ id: 1, lessons: [{ id: 1 }] }]);
  const [nextModuleId, setNextModuleId] = useState(2);
  const [nextLessonId, setNextLessonId] = useState(2);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Load modules data from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('newModulesData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (Array.isArray(data) && data.length > 0) {
          setModules(data);
          // Find the max id for modules and lessons to avoid id collision
          let maxModuleId = 1;
          let maxLessonId = 1;
          data.forEach((mod: any) => {
            if (mod.id && mod.id > maxModuleId) maxModuleId = mod.id;
            if (Array.isArray(mod.lessons)) {
              mod.lessons.forEach((lesson: any) => {
                if (lesson.id && lesson.id > maxLessonId) maxLessonId = lesson.id;
              });
            }
          });
          setNextModuleId(maxModuleId + 1);
          setNextLessonId(maxLessonId + 1);
        }
      } catch {}
    }
  }, []);

  // Mark as dirty on any change
  function markDirty() { setHasUnsavedChanges(true); }

  // Add beforeunload warning for unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasUnsavedChanges]);

  function showModal(message: string, timeout = 2000) {
    setModalMessage(message);
    setModalOpen(true);
    // NotificationModal auto-closes after timeout
  }

  // Save handler
  function handleSave() {
    localStorage.setItem('newModulesData', JSON.stringify(modules));
    setHasUnsavedChanges(false);
    showModal('Modules saved!');
  }

  // Confirm navigation if unsaved changes
  function confirmNav(action: () => void) {
    if (!hasUnsavedChanges) {
      action();
    } else {
      setModalMessage('You have unsaved changes. Please save before leaving.');
      setModalOpen(true);
    }
  }

  const handleAddModule = () => {
    setModules([...modules, { id: nextModuleId, lessons: [{ id: nextLessonId }] }]);
    setNextModuleId(nextModuleId + 1);
    setNextLessonId(nextLessonId + 1);
    markDirty();
  }

  const handleDeleteModule = (moduleId: number) => {
    setModules(modules.filter((module) => module.id !== moduleId));
    markDirty();
  }

  const handleAddLesson = (moduleId: number) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId ? { ...module, lessons: [...module.lessons, { id: nextLessonId }] } : module,
      ),
    );
    setNextLessonId(nextLessonId + 1);
    markDirty();
  }

  const handleDeleteLesson = (moduleId: number, lessonId: number) => {
    setModules(
      modules
        .map((module) =>
          module.id === moduleId
            ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
            : module,
        )
        .filter((module) => module.lessons.length > 0),
    );
    markDirty();
  }

  const handlePreviewAndPublish = () => {
    handleSave();
    router.push('/admin/course-management/course-preview');
  }

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-lg font-semibold text-gray-500">Course Content additional lesson</h2>
        </header>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Upload Course Content</h1>
            <div className="flex space-x-3">
              <Button onClick={handleAddModule} className="bg-[#0747A1] hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                <span>New Module</span>
                <Plus className="h-4 w-4" />
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2" onClick={handlePreviewAndPublish}>
                <span>Preview & Publish</span>
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">Add your modules and course resources here.</p>

          {modules.map((module, moduleIndex) => (
            <div key={module.id} className="mb-8 p-6 border rounded-lg bg-gray-50">
              <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
                <CardTitle className="text-2xl font-bold">Module {moduleIndex + 1}</CardTitle>
                {modules.length > 1 && ( // Only show delete if more than one module
                  <Button
                    variant="outline"
                    // size="icon"
                    onClick={() => handleDeleteModule(module.id)}
                    className="text-red-500 hover:bg-red-100"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Delete Module</span>
                  </Button>
                )}
              </CardHeader>
              {module.lessons.map((lesson, lessonIndex) => (
                <LessonBlock
                  key={lesson.id}
                  lessonNumber={lessonIndex + 1}
                  onDelete={() => handleDeleteLesson(module.id, lesson.id)}
                />
              ))}
              <Button
                variant="outline"
                onClick={() => handleAddLesson(module.id)}
                className="w-full mt-4 bg-transparent flex items-center justify-center gap-2 px-3 py-2 text-sm"
              >
                <span>New Lesson</span>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              className="bg-transparent flex items-center justify-center gap-2"
              onClick={() => confirmNav(() => router.back())}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
              onClick={() => confirmNav(() => {
                handleSave();
                showModal('Modules saved!');
                setTimeout(() => {
                  router.push('/admin/course-management/course-preview');
                }, 2000);
              })}
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem('newModulesData');
                  setModules([{ id: 1, lessons: [{ id: 1 }] }]);
                  setNextModuleId(2);
                  setNextLessonId(2);
                  setHasUnsavedChanges(false);
                  showModal('Modules reset!');
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </section>
      </main>
      <NotificationModal open={modalOpen} onClose={() => setModalOpen(false)} message={modalMessage} />
    </div>
  )
}
