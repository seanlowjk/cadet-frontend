import React, { useState } from 'react';

import AchievementCard from './cards/AchievementCard';
import PrerequisiteCard from './cards/PrerequisiteCard';
import {
  AchievementItem,
  FilterStatus,
  AchievementStatus,
  AchievementProgress
} from '../../../../commons/achievements/AchievementTypes';

type AchievementTaskProps = {
  achievement: AchievementItem;
  achievementDict: { [id: number]: AchievementItem };
  studentProgress: { [id: number]: AchievementProgress };
  filterStatus: FilterStatus;
  setModalID: any;
};

function AchievementTask(props: AchievementTaskProps) {
  const { achievement, achievementDict, filterStatus, setModalID, studentProgress } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const togglePrerequisitesDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const displayModal = (modalID: number) => {
    return () => setModalID(modalID);
  };

  /* -------- Helper for Renderer -------- */

  /**
   * Checks whether the AchievementItem should be rendered based on
   * the achivement page filterStatus.
   */

  const shouldRender = (achievement: AchievementItem): boolean => {
    switch (filterStatus) {
      case FilterStatus.ALL:
        return true;
      case FilterStatus.ACTIVE:
        return achievement.status === AchievementStatus.ACTIVE;
      case FilterStatus.COMPLETED:
        return achievement.status === AchievementStatus.COMPLETED;
      default:
        return false;
    }
  };

  /**
   * Checks whether the achievement item has any prerequisite item that
   * should be rendered based on the achievement page filterStatus.
   *
   * If there is at least 1 prerequisite that needs to be rendered,
   * the whole AchievementTask will be rendered together.
   */
  const shouldRenderPrerequisites = (achievement: AchievementItem) => {
    return getPrerequisites(achievement).reduce((canRender, prerequisite) => {
      return shouldRender(prerequisite) || canRender;
    }, false);
  };

  /* ------ Helper for Prerequisites ------ */

  // Returns an array of prerequisites of the AchievementItem
  const getPrerequisites = (achievement: AchievementItem): AchievementItem[] => {
    return achievement.prerequisiteIDs === undefined
      ? []
      : achievement.prerequisiteIDs.map(prerequisiteID => achievementDict[prerequisiteID]);
  };

  const hasPrerequisites = (achievement: AchievementItem): boolean => {
    return getPrerequisites(achievement).length > 0;
  };

  /* -------- Helper for Deadlines -------- */

  // Maps the prerequisites of the achievement to their furthest deadlines
  const mapPrerequisitesToDeadlines = (achievement: AchievementItem): (Date | undefined)[] => {
    const prerequisites = getPrerequisites(achievement);
    return prerequisites.map(prerequisite => getFurthestDeadline(prerequisite));
  };

  // Gets the furthest deadline of the achievement item, including its prerequisites
  const getFurthestDeadline = (achievement: AchievementItem): Date | undefined => {
    const prerequisiteDeadlines = mapPrerequisitesToDeadlines(achievement);
    return prerequisiteDeadlines.reduce(compareDeadlines, achievement.deadline);
  };

  // Comparator of two deadlines
  const compareDeadlines = (
    furthestDeadline: Date | undefined,
    currentDeadline: Date | undefined
  ) => {
    if (currentDeadline === undefined) {
      return furthestDeadline;
    } else if (furthestDeadline === undefined) {
      return currentDeadline;
    } else {
      return furthestDeadline >= currentDeadline ? furthestDeadline : currentDeadline;
    }
  };

  /* ----------- Helper for EXP ----------- */

  // Maps the prerequisites of the achievement to their total EXP
  const mapPrerequisitesToEXPs = (achievement: AchievementItem): (number | undefined)[] => {
    const prerequisites = getPrerequisites(achievement);
    return prerequisites.map(prerequisite => getTotalEXP(prerequisite));
  };

  // Gets the total EXP of the achievement item, including its prerequisites
  const getTotalEXP = (achievement: AchievementItem): number | undefined => {
    const prerequisiteEXPs = mapPrerequisitesToEXPs(achievement);
    return prerequisiteEXPs.reduce(combineEXPs, achievement.exp);
  };

  // Sum of two EXP
  const combineEXPs = (accumulateEXP: number | undefined, currentEXP: number | undefined) => {
    if (currentEXP === undefined) {
      return accumulateEXP;
    } else if (accumulateEXP === undefined) {
      return currentEXP;
    } else {
      return accumulateEXP + currentEXP;
    }
  };

  /* -------- Helper for Progress -------- */

  // Returns the achievement progress in decimal (e.g. 0.5)
  const getAchievementProgress = (achievement: AchievementItem): number => {
    const progress = studentProgress[achievement.id];
    return Math.min(progress.completionProgress / achievement.completionGoal, 1);
  };

  // if the main achievement or any of the prerequisites need to be rendered,
  // the whole achievement task will be rendered
  return (
    <>
      {shouldRender(achievement) || shouldRenderPrerequisites(achievement) ? (
        <li key={achievement.id}>
          <AchievementCard
            achievement={achievement}
            exp={getTotalEXP(achievement)}
            deadline={getFurthestDeadline(achievement)}
            progress={getAchievementProgress(achievement)}
            shouldPartiallyRender={!shouldRender(achievement)}
            hasDropdown={hasPrerequisites(achievement)}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={togglePrerequisitesDropdown}
            displayModal={displayModal}
          />
          {isDropdownOpen ? (
            <ul>
              {getPrerequisites(achievement).map(prerequisite => (
                <li key={prerequisite.id}>
                  <div className="node">
                    <PrerequisiteCard
                      achievement={prerequisite}
                      exp={getTotalEXP(prerequisite)}
                      deadline={getFurthestDeadline(prerequisite)}
                      progress={getAchievementProgress(prerequisite)}
                      displayModal={displayModal}
                      shouldPartiallyRender={!shouldRender(prerequisite)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ) : null}
    </>
  );
}

export default AchievementTask;
