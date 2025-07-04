import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CompanionsListsProps {
  title: string;
  companions?: Companion[]; // Adjust type as needed
  classNames?: string; 
}

const CompanionsList = ({title, companions, classNames}: CompanionsListsProps) => {
  return (
    <article className={cn("companion-list", classNames)}>
      <h2 className="font-bold text-3xl">Recent Sessions</h2>

      <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-lg w-2/3">Companion</TableHead>
          <TableHead className="text-lg">Subject</TableHead>
          <TableHead className="text-lg text-right">Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

        {companions?.map((companion) => (
          <TableRow key={companion.id}>
            <TableCell>
              <Link href = {`/companion/${companion.id}`}>
                <div className="flex items-center gap-2">
                  <div className="size-[72px] items-center justify-center rounded-lg max-md:hidden" style={{
                    backgroundColor: getSubjectColor(companion.subject)
                  }}>
                    <Image
                      src={`/icons/${companion.subject}.svg`}
                      alt="subject"
                      width={35}
                      height={35}
                    ></Image>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-2xl">{companion.name}</p>
                    <p className="text-lg">{companion.topic}</p>
                  </div>

                  </div>
              </Link>
            </TableCell>
            <TableCell>
              <div className="subject-badge w-fit max-md:hidden">
                  {companion.subject}
              </div>
              <div className="flex items-center justify-center rounded-lg p-2 md:hidden" style={{backgroundColor: getSubjectColor(companion.subject)}}>
                <Image
                  src={`/icons/${companion.subject}.svg`}
                  alt="subject"
                  width={18}
                  height={38}
                />
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 w-full justify-end">
                <p className="text-2xl">
                  {companion.duration}
                  <span className="max-md:hidden">mins</span>
                </p>
                <Image src="/icons/clock.svg" alt="clock" className="md:hidden" width={14} height={14}></Image>
              </div>
            </TableCell>
            
          </TableRow>
        ))}
        </TableBody>
    </Table>

    </article>
  )
}

export default CompanionsList